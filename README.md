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
    "imdb_id": "tt2356777",
    "tvdb_id": 270633,
    "title": "True Detective",
    "year": 2014,
    "images": {
        "poster": "http://slurm.trakt.us/images/posters/27434.18.jpg",
        "fanart": "http://slurm.trakt.us/images/fanart/27434.18.jpg",
        "banner": "http://slurm.trakt.us/images/banners/27434.18.jpg"
    },
    "slug": "true-detective",
    "synopsis": "The lives of two detectives, Rust Cohle and Martin Hart, become entangled during a 17-year hunt for a serial killer in Louisiana.",
    "runtime": 60,
    "rating": {
        "percentage": 91,
        "votes": 2437,
        "loved": 2374,
        "hated": 63
    },
    "genres": ["Drama", "Crime"],
    "country": "United States",
    "network": "HBO",
    "air_day": "Sunday",
    "air_time": "9:00pm",
    "num_seasons": 1,
    "_id": "FblmufC3cO4VCf7J",
    "episodes": [{
        "tvdb_id": 4592328,
        "season": 1,
        "episode": 1,
        "title": "The Long Bright Dark",
        "overview": "Former Louisiana State CID partners Martin Hart and Rustin Cohle give separate statements to a pair of investigators about the murder of a prostitute, Dora Lange, 17 years earlier. As they look back, details of the crime, replete with occult overtones, are accompanied by insights into the detectivesâ€™ volatile partnership and personal lives.",
        "torrents": [{
            "url": "magnet:?xt=urn:btih:HRBNG4TZ5HA4M3Z5BWDFRXC23ZT65QLE&dn=True.Detective.S01E01.HDTV.x264-2HD&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80",
            "seeds": 0,
            "peers": 0,
            "format": "720"
        }]
    }, {
        "tvdb_id": 4592329,
        "season": 1,
        "episode": 2,
        "title": "Seeing Things",
        "overview": "Under pressure to land a suspect in the Lange murder, Quesada warns Hart and Cohle that they might be replaced by three detectives from a new task force. The pair lobbies for extra time to follow up on a lead that takes them from a rural cathouse to an incinerated church. With his marriage to Maggie already strained by work, Hart finds respite away from home.",
        "torrents": [{
            "url": "magnet:?xt=urn:btih:2SUAYTOOHMEOHDZG2INHDIBP43YSDXWF&dn=True.Detective.S01E02.HDTV.x264-2HD&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80",
            "seeds": 0,
            "peers": 0,
            "format": "720"
        }]
    }, {
        "tvdb_id": 4592330,
        "season": 1,
        "episode": 3,
        "title": "The Locked Room",
        "overview": "A hidden image at the burned-out church leads Cohle and Hart to Joel Theriot, a tent-revival minister whose parishioners finger a scarred â€œtall manâ€ seen with Dora Lange. Brought in for interrogation, a sex offender matching the description is quickly dismissed by Cohle, despite offering a confession. Hart gets sidetracked after Maggie sets Cohle up with a friend at a C&W bar. Looking to establish a pattern of murder, Cohle pores over old case files, finding a connection with a woman assumed to have drowned years earlier.",
        "torrents": [{
            "url": "magnet:?xt=urn:btih:LITMEYRGW2O2TBLZ4WRKZXQCHHYSKIPB&dn=True.Detective.S01E03.HDTV.x264-KILLERS&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80",
            "seeds": 0,
            "peers": 0,
            "format": "720"
        }]
    }, {
        "tvdb_id": 4592331,
        "season": 1,
        "episode": 4,
        "title": "Who Goes There?",
        "overview": "Hart and Cohle hunt for their newly identified suspect, Reggie Ledoux, a meth cooker who shared a cell with Dora Lange's husband and recently skipped parole. As Hart's personal life collapses around him, Cohle immerses himself in an old criminal identity from his narco days, contacting an East-Texas biker gang known to deal with their primary suspect. Cohle's undercover work takes him to a dangerous edge where the law has no place, and both men must confront the cost of living a false life.",
        "torrents": [{
            "url": "magnet:?xt=urn:btih:TRYCWHGBIFJVZNBKNKIAI3EZQYMMKUZR&dn=True.Detective.S01E04.HDTV.x264-2HD&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80",
            "seeds": 0,
            "peers": 0,
            "format": "720"
        }]
    }, {
        "tvdb_id": 4592332,
        "season": 1,
        "episode": 5,
        "title": "The Secret Fate of All Life",
        "overview": "A violent denouement in the forest clears the Dora Lange case and turns Cohle and Hart into local heroes. Each man settles into a healthier rhythm of living as Hart returns to his family, and Cohle starts a relationship while gaining a reputation as a closer in interrogations. As time passes and his daughters grow older, Hart faces new tensions and temptations, and Cohle learns from a double-murder suspect that there could be much more to an old case than he'd once thought. In 2012, Gilbough and Papania put their cards on the table, presenting new intelligence that threatens Cohle and causes Hart to reassess everything he thought he knew about his former partner.",
        "torrents": [{
            "url": "magnet:?xt=urn:btih:2T2K7GYS6I5W6PMWKGAXISAUFCZTY2NR&dn=True.Detective.S01E05.HDTV.x264-KILLERS&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80",
            "seeds": 0,
            "peers": 0,
            "format": "720"
        }]
    }, {
        "tvdb_id": 4592333,
        "season": 1,
        "episode": 6,
        "title": "Haunted Houses",
        "overview": "In 2002, Cohle and Hart begin to fall back to familiar and violent obsessions. Hart exacts savage vengeance on a pair of teenage boys, and Cohle becomes convinced they left something undone in 1995. Working on his own, Cohle traces a sinister connection between missing children along the coast and evangelist Billy Lee Tuttle's Wellsprings Program. Hart is reintroduced to a former prostitute he met during the Lange investigation. In 2012, Papania and Gilbough question Maggie, now divorced from Marty, about Cohle and Hart during 2002, the year their relationship fractured and Cohle quit the force following a suspension.",
        "torrents": [{
            "url": "magnet:?xt=urn:btih:AATG2JRL5J6EIJ75EPGK2LT3CLGN45VP&dn=True.Detective.S01E06.720p.HDTV.x264-2HD&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80",
            "seeds": 0,
            "peers": 0,
            "format": "720"
        }]
    }, {
        "tvdb_id": 4592334,
        "season": 1,
        "episode": 7,
        "title": "After You've Gone",
        "overview": "Hart and Cohle call a truce to investigate a series of disappearances that may be related to the Dora Lange murder and the Tuttle family.",
        "torrents": [{
            "url": "magnet:?xt=urn:btih:25XTQEPCHI35EVRYY3U4N2QFS7SMFKWH&dn=True.Detective.S01E07.HDTV.x264-KILLERS&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80",
            "seeds": 0,
            "peers": 0,
            "format": "720"
        }]
    }, {
        "tvdb_id": 4592335,
        "season": 1,
        "episode": 8,
        "title": "Form and Void",
        "overview": "An overlooked detail provides Hart and Cohle with an important new lead in their 17-year-old case.",
        "torrents": [{
            "url": "magnet:?xt=urn:btih:HMZQCZ6G5V6XXM473LSTCSITGQES3ZJF&dn=True.Detective.S01E08.HDTV.x264-2HD&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80",
            "seeds": 0,
            "peers": 0,
            "format": "720"
        }]
    }],
    "last_updated": 1399003253793
}
```
	
    
