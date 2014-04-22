var fs = require('fs');
var path = require('path');

var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var sanitizeHtml = require('sanitize-html');
var URI = require('URIjs');

var server = require('./server');
var utils = require('./lib/utils');

var BASE_URL    =   "http://eztv.it";
var SHOWLIST    =   "/showlist/";
var LATEST  =   "/sort/100/";
var SEARCH  =   "/search/";

var TRAK_API_ENDPOINT = URI('http://api.trakt.tv/');
var TRAK_API_KEY = '7b7b93f7f00f8e4b488dcb3c5baa81e1619bb074';
var PouchDB = require('pouchdb');

var db = new PouchDB('tv_shows');

function getText($el) {
    return $el.text().trim();
}

function extractShowInfo(imdb, showUrl) {

    console.log("extractShowInfo " + showUrl);
    var thisShow = {};

    request(BASE_URL + showUrl, function(error, response, html){
        var $$ = cheerio.load(html);
        $$('tr.forum_header_border').each(function(){

            var showStructure = {};
            var showDetails = [];
            var episode_elements = $$(this);
            // title
            var title = episode_elements.children().eq(1).children().attr('title');
            

            if (title && title.indexOf("x264") > 0) {
                var seasonFound = title.match(/S([0-9]+)E([0-9]+)/);

                if (seasonFound && seasonFound.length > 1) {
                    var saison = seasonFound[1];
                    var episode = seasonFound[2];
                    if (!thisShow[saison]) thisShow[saison] = {};

                    var links = episode_elements.children().eq(2).first().find('a').first().attr('href');
                    thisShow[saison][episode] = links;
                }
            }
        });

        var query = { imdb: imdb };
        //TVShow.update(query, { torrents: thisShow });
        db.get(imdb, function(err, currentDoc) {
            var oldRev = currentDoc._rev;
            delete currentDoc._rev;
            delete currentDoc._id;
            currentDoc.torrents = thisShow;
            db.put(currentDoc, imdb, oldRev, function(err, response) { });
        });

        console.log(thisShow);
    });
}

function extractTrakt(thisUrl, callback) {

    var slug = thisUrl.match(/\/shows\/(.*)\/(.*)\//)[2];

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
                var show = db.put({ _id: data.imdb_id, title: data.title, year: data.year, images: data.images, slug: slug, synopsis: data.overview, synopsis: data.overview, runtime: data.runtime, rating: 0});
                console.log("New show added to DB : " + data.imdb_id);
                extractShowInfo(data.imdb_id, thisUrl);
            }

        }

    });

    // ok we extract the torrents for this show

    
}


function refreshView(req, res) {

    console.log('\n' + new Date(), '[' + req.method + ']', req.url);
    var allSlugs = [];
    var allUrls = [];
    request.get(BASE_URL + SHOWLIST, function getShowResponse(err, response, body) {
        console.log('Processing:', BASE_URL + SHOWLIST);

        if (err || response.statusCode !== 200) {
            console.error('Could not fetch ' + BASE_URL + SHOWLIST + '\n', err);
        } else {

            var $ = cheerio.load(body);
            $('.thread_link').each(function(){
                var entry = $(this);
                var thisShow = {};
                var showUrl = entry.first().attr('href');
                allUrls.push(showUrl);

            });

            //async.map(allUrls ,extractShowInfo, function showListDone(err, result) {

            //    console.log(result);
                //process.exit();

            //});

            async.map(allUrls ,extractTrakt);            
        }        

    });

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

server.get('/show/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
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
