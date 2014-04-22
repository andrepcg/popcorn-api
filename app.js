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

    console.log("extractShowInfo " + showUrl);
    var thisShow = {};

    eztv.getAllEpisodes(show, function(err, data) {
        if(err) return console.error(err);
        thisShow = data;
        var query = { imdb: imdb };
        //TVShow.update(query, { torrents: thisShow });
        db.get(imdb, function(err, currentDoc) {
            var oldRev = currentDoc._rev;
            delete currentDoc._rev;
            delete currentDoc._id;
            currentDoc.torrents = thisShow;
            db.put(currentDoc, imdb, oldRev, function(err, response) { });
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
            if (data.imdb_id) {
                var show = db.put({ _id: data.imdb_id, title: data.title, year: data.year, images: data.images, slug: slug, synopsis: data.overview, synopsis: data.overview, runtime: data.runtime, rating: 0, genres: data.genres, country: data.country, network: data.network});
                console.log("New show added to DB : " + data.imdb_id);
                extractShowInfo(data.imdb_id, show);
            }

        }

    });

    // ok we extract the torrents for this show

    
}


function refreshView(req, res) {

    console.log('\n' + new Date(), '[' + req.method + ']', req.url);
    var allShows = [];

    for(var provider in providers) {
        provider.getAllShows(function(err, shows) {
            if(err) return console.error(err);
            allShows.push(shows)
        });
    }

    async.map(allShows ,extractTrakt);

    res.json(202, {success: true});
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

var refreshEndpoint = {
    url: '/refresh'
};

server.get(refreshEndpoint, refreshView);
server.listen(process.env.PORT || 5000, function() {
    console.log('%s listening at %s', server.name, server.url);

    // we start a first refresh
    //refreshView(false,false);
});
