var fs = require('fs');
var path = require('path');

var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var URI = require('URIjs');
var eztv = require('eztv_api_x');

var server = require('./server');
var providers = [eztv];

var TRAK_API_ENDPOINT = URI('http://api.trakt.tv/');
var TRAK_API_KEY = '7b7b93f7f00f8e4b488dcb3c5baa81e1619bb074';

var db = require('./database');

// TTL for torrent link (24 hrs ?)
var TTL = 1000 * 60 * 60 * 24;

/*
 *  EXTRACT FUNCTIONS
 */

function extractShowInfo(imdb, show) {

    console.log("extractShowInfo " + show.show);
    var thisShow = {};

    eztv.getAllEpisodes(show, function(err, data) {
        if(err) return console.error(err);
        thisShow = data;
        var query = { imdb: imdb };
        // upate with right torrent link
        db.tvshows.update({ imdb_id: imdb }, { $set: { torrents: thisShow, last_updated: +new Date() } });
    });
}

function extractTrakt(show, callback) {

    var slug = show.slug;

    console.log("extractTrakt " + slug);
    var uri = TRAK_API_ENDPOINT.clone()
         .segment([
            'show',
            'summaries.json',
            TRAK_API_KEY,
            slug,
            'full'
        ]);

    console.log("request " + uri.toString());
    request({url: uri.toString(), json: true}, function(error, response, data) {

        if(error || !data) {
            //console.log(error);
        } else {
            data = data[0];

            // ok we need all torrents
            //console.log(data);

            if (data && data.imdb_id) {

                // TODO: Extract rating from IMDB

                var new_data = { 
                    imdb_id: data.imdb_id,
                    title: data.title,
                    year: data.year,
                    images: data.images,
                    slug: slug,
                    synopsis: data.overview,
                    runtime: data.runtime,
                    rating: 0,
                    genres: data.genres,
                    country: data.country,
                    network: data.network,
                    air_day: data.air_day,
                    air_time: data.air_time
                };

                db.tvshows.find({ imdb_id: data.imdb_id }, function (err, docs) {
                  
                  if (docs.length == 0) {

                        // brand new show, so we need to extract it from scratch
                        db.tvshows.insert(new_data, function(err, newDocs) {
                            extractShowInfo(data.imdb_id, show);
                        });

                  } else {

                    // compare with current time
                    var now = +new Date();
                    // ok it already exist, we'll check the TTL of the cache
                    docs.forEach(function(showInfo) {
                        if ( (now-showInfo.last_updated) > TTL ) {
                            extractShowInfo(data.imdb_id, show);
                        }
                    });
                  }

                });
            }
        }

    });
}

function refreshDatabase() {
    var allShows = [];
    async.each(providers, function(provider, cb) {
        provider.getAllShows(function(err, shows) {
            if(err) return console.error(err);
            allShows.push(shows);
            cb();
        });
    }, function (error) {
        if(error) return console.error(error);
        async.map(allShows[0] ,extractTrakt);
    });
}

/*
 *  API ROUTES
 */

server.get('/shows', function(req, res) {
    var byPage = 30;
    db.tvshows.find({}).sort({ year: -1 }).limit(byPage).exec(function (err, docs) {
      res.json(202, docs);
    });
});

server.get('/shows/:page', function(req, res) {
    var page = req.params.page-1;    
    var byPage = 30;
    var offset = page*byPage;
    db.tvshows.find({}).sort({ year: -1 }).skip(offset).limit(byPage).exec(function (err, docs) {
      res.json(202, docs);
    });
});

server.get('/shows/last_updated', function(req, res) { 
    var byPage = 30;
    db.tvshows.find({}).sort({ last_updated: -1 }).limit(byPage).exec(function (err, docs) {
      res.json(202, docs);
    });
});

server.get('/shows/updated/:since', function(req, res) {
    var since = req.params.since
    db.tvshows.find({last_updated : {$gt: parseInt(since)}}, function(err, docs) {
        res.json(202, docs);
    })
})

server.get('/shows/last_updated/:page', function(req, res) {
    var page = req.params.page-1;    
    var byPage = 30;
    var offset = page*byPage;
    db.tvshows.find({}).sort({ last_updated: -1 }).skip(offset).limit(byPage).exec(function (err, docs) {
      res.json(202, docs);
    });
});

server.get('/shows/search/:search', function(req, res) {
    var byPage = 30;
    var keywords = new RegExp(req.params.search.toLowerCase(),"gi");
    db.tvshows.find({title: keywords}).sort({ last_updated: -1 }).limit(byPage).exec(function (err, docs) {
      res.json(202, docs);
    });
});

server.get('/shows/search/:search/:page', function(req, res) {
    var page = req.params.page-1;
    var byPage = 30;
    var offset = page*byPage;    
    var keywords = new RegExp(req.params.search.toLowerCase(),"gi");
    db.tvshows.find({title: keywords}).sort({ last_updated: -1 }).skip(offset).limit(byPage).exec(function (err, docs) {
      res.json(202, docs);
    });
});

server.get('/show/:id', function(req, res) {
    db.tvshows.find({imdb_id: req.params.id}).limit(1).exec(function (err, docs) {
        if (docs.length > 0 ) docs = docs[0];
        res.json(202, docs);
    });
});

server.listen(process.env.PORT || 5000, function() {
    console.log('%s listening at %s', server.name, server.url);
    refreshDatabase();
});


// cronjob
try {
    var CronJob = require('cron').CronJob;
    var job = new CronJob('00 00 00 * * *', function(){
        refreshDatabase();
      }, function () {
        // This function is executed when the job stops
      },
      true
    );
    console.log("Cron job started");
} catch(ex) {
    console.log("cron pattern not valid");
}
