# popocorn-api

Scrape torrents from eztv and generate a local database accessible with an api compatible with popcorn time.

#### Official API Endpoint
	http://popcorn-api.com
	http://popcorn-api.net

## Installation

* `npm install`
* `node app.js`

## Sample Usage

We automatically generate the DB on start and we resync with eztv everyday at 00:00

### Access api

#### View all shows
 	http://localhost:5000/shows
 	http://localhost:5000/shows/[page]

#### View shows with latest updated torrent link
 	http://localhost:5000/shows/last_updated
 	http://localhost:5000/shows/last_updated/[page]

#### Search
	http://localhost:5000/shows/search/[keyword]
	http://localhost:5000/shows/search/[keyword]/[page]

#### Show detail
	http://localhost:5000/show/[imdb_id]

#### View shows updated since a time
	http://localhost:5000/shows/updated/[since]

#### Get All Shows (Can be slow)
	http://localhost:5000/shows/all

***

## Sample Data
```
{
    "imdb_id": "tt2230805",
    "tvdb_id": 256404,
    "title": "Unchained Reaction",
    "year": 2012,
    "images": {
        "poster": "http://slurm.trakt.us/images/posters/15313.jpg",
        "fanart": "http://slurm.trakt.us/images/fanart/15313.jpg",
        "banner": "http://slurm.trakt.us/images/banners/15313.jpg"
    },
    "slug": "unchained-reaction",
    "synopsis": "Unchained Reaction is a science and engineering reality game show set to air on the Discovery Channel. It is judged and executive-produced by Adam Savage and Jamie Hyneman, best known for hosting the science entert",
    "runtime": 45,
    "rating": {
        "percentage": 69,
        "votes": 39,
        "loved": 30,
        "hated": 9
    },
    "genres": ["Game Show", "Reality"],
    "country": "United States",
    "network": "Discovery",
    "air_day": "Sunday",
    "air_time": "10:00pm",
    "num_seasons": 1,
    "_id": "30mGHPMLV0ByydSB",
    "episodes": [{
        "tvdb_id": 4275750,
        "season": 1,
        "episode": 1,
        "title": "Heavy vs. Light",
        "overview": "Adam and Jamie challenge electronics experts and set carpenters to build the most creative multi-step \"heavy-vs-light\" themed machine.",
        "first_aired": 1332122400,
        "watched": {
            "watched": false
        },
        "torrents": [{
            "url": "magnet:?xt=urn:btih:GZXCPP5DKNDYE3M2HG6ALWR4SZQR3NK2&dn=Unchained.Reaction.S01E01.Heavy.vs.Light.HDTV.x264-MOMENTUM&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80",
            "seeds": 0,
            "peers": 0,
            "format": "720"
        }]
    }, {
        "tvdb_id": 4288699,
        "season": 1,
        "episode": 2,
        "title": "Fire and Ice",
        "overview": "Rocket scientists and special-effects artists go head-to-head in their effort to build the very best fire-and-ice themed machine.",
        "first_aired": 1332727200,
        "watched": {
            "watched": false
        },
        "torrents": [{
            "url": "magnet:?xt=urn:btih:MUZV3BGFD4JJUSPG5TKBXBKMA7OQ6AFQ&dn=Unchained.Reaction.S01E02.HDTV.x264-MOMENTUM&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80",
            "seeds": 0,
            "peers": 0,
            "format": "720"
        }]
    }, {
        "tvdb_id": 4296035,
        "season": 1,
        "episode": 3,
        "title": "Speed",
        "overview": "Horror movie-effects specialists battle motorcycle mechanics in the fight to build the meanest speed-themed machine.",
        "first_aired": 1333332000,
        "watched": {
            "watched": false
        },
        "torrents": [{
            "url": "magnet:?xt=urn:btih:5EPJKLMEN6X6PAUDU4MWNFO7CKUS6PBO&dn=Unchained.Reaction.S01E03.HDTV.x264-MOMENTUM&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80",
            "seeds": 0,
            "peers": 0,
            "format": "720"
        }]
    }, {
        "tvdb_id": 4299634,
        "season": 1,
        "episode": 5,
        "title": "Jack of All Trades",
        "overview": "Designers and construction workers square off to build the most impressive multi-step tool-themed machines, but tensions rise amongst both groups and one team finds itself at odds with its machine.",
        "first_aired": 1334541600,
        "watched": {
            "watched": false
        },
        "torrents": [{
            "url": "magnet:?xt=urn:btih:T7XNXX5UZQ5CST7SUGWSKU7KQW6XY56O&dn=Unchained.Reaction.S01E05.HDTV.x264-MOMENTUM&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80",
            "seeds": 0,
            "peers": 0,
            "format": "720"
        }]
    }, {
        "tvdb_id": 4299635,
        "season": 1,
        "episode": 6,
        "title": "Movie Mayhem",
        "overview": "Rick Baker is the guest judge as Team InSaign (metal workers) and Team Fail Fail Fail Win (multi-media artists) fight for best machine.",
        "first_aired": 1335146400,
        "watched": {
            "watched": false
        },
        "torrents": [{
            "url": "magnet:?xt=urn:btih:Q4FE75UKAUNDTYQRT2VMAUMZ7YU2PFWW&dn=Unchained.Reaction.S01E06.HDTV.x264-YesTV&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80",
            "seeds": 0,
            "peers": 0,
            "format": "720"
        }]
    }],
    "last_updated": 1399403307163
}
```
	
    
