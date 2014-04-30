var fs = require('fs');
var path = require('path');

var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var eztv = require('eztv_api_x');

var Trakt = require('trakt');
var trakt = new Trakt({api_key: '7b7b93f7f00f8e4b488dcb3c5baa81e1619bb074'}); 

var server = require('./server');
var providers = [eztv];

var db = require('./database');

// TTL for torrent link (24 hrs ?)
var TTL = 1000 * 60 * 60 * 24;

/*
 *  EXTRACT FUNCTIONS
 */


function extractShowInfo(show, callback) {

    console.log("extractShowInfo " + show.show + " " + show.imdb);
    var thisShow = {};
    var thisEpisodes = [];
    var thisEpisode = {};
    var numSeasons = 0;

    var imdb = show.imdb;

    eztv.getAllEpisodes(show, function(err, data) {
        thisShow = data;

        if(!data) return callback(null, show);
        console.log("Looking for "+ show.show);

        // upate with right torrent link
       async.each(Object.keys(data), function(season, cb) {
               numSeasons++;
               try {
                   trakt.request('show', 'season', {title: imdb, season: season}, function(err, seasonData) {
                       for(var episodeData in seasonData){
                           episodeData = seasonData[episodeData];
                           if (typeof(data[season]) != 'undefined' && typeof(data[season][episodeData.episode]) != 'undefined') {

                               // hardcode the 720 for this source
                               // TODO: Should add it from eztv_x
                               data[season][episodeData.episode].format = "720";
                               thisEpisode = {
                                   tvdb_id: episodeData.tvdb_id,
                                   season: episodeData.season,
                                   episode: episodeData.episode,
                                   title: episodeData.title,
                                   overview: episodeData.overview,
                                   watched : {watched: false},
                                   torrents: []
                               };
                               thisEpisode.torrents.push(data[season][episodeData.episode]);
                               thisEpisodes.push(thisEpisode);
                           }
                       }
                       cb();
                   });
               } catch (err) {
                   console.log("Error:", err)
                   cb();
               }
       },
       function(err, res) {
           // Only change "lastUpdated" date if there are new episodes
           db.tvshows.findOne({imdb_id: show.imdb}, function(err, show) {
               if(err) return console.error(err);
               if(show.episodes != thisEpisodes) {
                   db.tvshows.update({ _id: show._id },
                       { $set: { episodes: thisEpisodes, last_updated: +new Date(), num_seasons: numSeasons}},
                       function(err, show) {
                           return callback(err, null);
                       });
               }
               else {
                   return callback(null, show);
               }
           });

           return callback(null, show);
       });


    });
}

function extractTrakt(show, callback) {

    var slug = show.slug;

    console.log("Extracting "+ show.show);
    db.tvshows.findOne({slug: show.slug}, function(err, doc){
        if(err || !doc) {
            console.log("New Show");
            try {
                trakt.request('show', 'summary', {title: show.slug}, function(err, data) {
                if (!err && data) {

                    // ok show exist
                    var new_data = { 
                        imdb_id: data.imdb_id,
                        tvdb_id: data.tvdb_id,
                        title: data.title,
                        year: data.year,
                        images: data.images,
                        slug: slug,
                        synopsis: data.overview,
                        runtime: data.runtime,
                        rating: data.ratings,
                        genres: data.genres,
                        country: data.country,
                        network: data.network,
                        air_day: data.air_day,
                        air_time: data.air_time,
                        num_seasons: 0
                    };
                    db.tvshows.insert(new_data, function(err, newDocs) {
                        show.imdb = data.imdb_id;
                        extractShowInfo(show, function(err, show) {
                            return callback(err, show);
                        });
                    });
                } 
                else {
                    return callback(null, show);
                }
            })
        } catch (err) {
            console.log("Error:", err)
            return callback(null, show);
        }
    }
    else {
        console.log("Existing Show: Checking TTL");
        // compare with current time
        var now = +new Date();
        if ( (now - doc.last_updated) > TTL ) {
            console.log("TTL expired, updating info");
            show.imdb = doc.imdb_id;
            //TODO: Change this to just get new rating or something
            extractShowInfo(show, function(err, show) {
                return callback(err, show);
            });
        }
        else {
            return callback(null, show);
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
        async.mapSeries(allShows[0], extractTrakt, function(err, results){

        });
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

server.get('/shows/all', function(req, res) {
    db.tvshows.find({num_seasons: { $gt: 0 }}).sort({ year: -1 }).exec(function (err, docs) {
      res.json(202, docs);
    });
});

server.get('/shows/:page', function(req, res) {
    var page = req.params.page-1;   
    var byPage = 30;
    var offset = page*byPage;
    db.tvshows.find({num_seasons: { $gt: 0 }}).sort({ year: -1 }).skip(offset).limit(byPage).exec(function (err, docs) {
      res.json(202, docs);
    });
});

server.get('/shows/last_updated', function(req, res) { 
    var byPage = 30;
    db.tvshows.find({num_seasons: { $gt: 0 }}).sort({ last_updated: -1 }).limit(byPage).exec(function (err, docs) {
      res.json(202, docs);
    });
});

server.get('/shows/updated/:since', function(req, res) {
    var since = req.params.since;
    db.tvshows.find({last_updated : {$gt: parseInt(since)},num_seasons: { $gt: 0 }}, function(err, docs) {
        res.json(202, docs);
    })
})

server.get('/shows/last_updated/:page', function(req, res) {
    var page = req.params.page-1;   
    var byPage = 30;
    var offset = page*byPage;
    db.tvshows.find({num_seasons: { $gt: 0 }}).sort({ last_updated: -1 }).skip(offset).limit(byPage).exec(function (err, docs) {
      res.json(202, docs);
    });
});

server.get('/shows/search/:search', function(req, res) {
    var byPage = 30;
    var keywords = new RegExp(req.params.search.toLowerCase(),"gi");
    db.tvshows.find({title: keywords,num_seasons: { $gt: 0 }}).sort({ last_updated: -1 }).limit(byPage).exec(function (err, docs) {
      res.json(202, docs);
    });
});

server.get('/shows/search/:search/:page', function(req, res) {
    var page = req.params.page-1;
    var byPage = 30;
    var offset = page*byPage;    
    var keywords = new RegExp(req.params.search.toLowerCase(),"gi");
    db.tvshows.find({title: keywords,num_seasons: { $gt: 0 }}).sort({ last_updated: -1 }).skip(offset).limit(byPage).exec(function (err, docs) {
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

// trakt error catcher
trakt.on('error', function(err){
    console.log(err);
});
