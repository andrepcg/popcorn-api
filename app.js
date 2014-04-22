var fs = require('fs');
var path = require('path');

var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var sanitizeHtml = require('sanitize-html');
var URI = require('URIjs');
var eztv = require('eztv_api_x');

var server = require('./server');
var utils = require('./lib/utils');

var providers = [eztv];

var TRAK_API_ENDPOINT = URI('http://api.trakt.tv/');
var TRAK_API_KEY = '7b7b93f7f00f8e4b488dcb3c5baa81e1619bb074';
var PouchDB = require('pouchdb');

var db = new PouchDB('tv_shows');

function getText($el) {
    return $el.text().trim();
}

function extractShowInfo(imdb, show) {

    console.log("extractShowInfo " + show.show);
    var thisShow = {};

    eztv.getAllEpisodes(show, function(err, data) {
        if(err) return console.error(err);
        thisShow = data;
        var query = { imdb: imdb };
        //TVShow.update(query, { torrents: thisShow });
        db.get(imdb, function(err, currentDoc) {
            var oldRev = currentDoc._rev;
            currentDoc.torrents = thisShow;
            db.put(currentDoc);
        });

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

                var new_data = { 
                    _id: data.imdb_id,
                    title: data.title,
                    year: data.year,
                    images: data.images,
                    slug: slug,
                    synopsis: data.overview,
                    runtime: data.runtime,
                    rating: 0,
                    genres: data.genres,
                    country: data.country,
                    network: data.network
                };

                db.get(data.imdb_id, function(err, currentDoc) {
                    // make sure to add new show only
                    if (err) {
                        var show = db.put(new_data);
                        console.log("New show added to DB : " + data.imdb_id);
                    }
                });

                // here we go this show is interesting,
                // we can start extracting eztv
                extractShowInfo(data.imdb_id, show);

            }

        }

    });

    // ok we extract the torrents for this show

    
}



function refreshView() {

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

server.get('/shows/:page', function(req, res) {
    var page = req.params.page-1;    
    var byPage = 30;
    var offset = page*byPage;
    db.allDocs({include_docs: true, skip : offset, limit : byPage}, function(err, response) {
        res.json(202, response.rows);
    });
});

server.get('/search/:search', function(req, res) {
 
    var keywords = req.params.search.toLowerCase();    
     function map(doc) {
        if(doc.title) {
          emit(doc.title.toLowerCase(), doc);
        }
      }

      function filter(err, response) {
        if (err) return callback(err);

        var matches = [];
        response.rows.forEach(function(showInfo) {
          if (showInfo.key.indexOf(keywords) > -1) {
            matches.push(showInfo);
          }
        });

        res.json(202, matches);
      }

    db.query({map: map}, {reduce: false}, filter);

});

server.get('/show/:id', function(req, res) {
    var id = req.params.id;
    db.get(id, function(err, response) {
        res.json(202, response);
    });
});


server.listen(process.env.PORT || 5000, function() {
    console.log('%s listening at %s', server.name, server.url);
    refreshView();
});


// cronjob
try {
    var CronJob = require('cron').CronJob;
    var job = new CronJob('00 00 00 * * *', function(){
        refreshView();
      }, function () {
        // This function is executed when the job stops
      },
      true
    );
    console.log("Cron job started");
} catch(ex) {
    console.log("cron pattern not valid");
}
