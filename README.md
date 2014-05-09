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
	
## Sample Data provided by eztv_api_x
```
{ '1':
   { '1':
      { url: 'magnet:?xt=urn:btih:SJ4DX6NRO5CDE3CLDL2OLWCTEYRUFWQU&dn=Game.of.Thrones.S01E01.HDTV.XviD-FEVER&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '2':
      { url: 'magnet:?xt=urn:btih:HYIUEHWR3MCCI4OYALDU55BX3KJO2SAU&dn=Game.of.Thrones.S01E02.The.Kingsroad.HDTV.XviD-FQM&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '3':
      { url: 'magnet:?xt=urn:btih:PM5NL2SX6UCQNT5L6FUZFO2VZ7G7VBQX&dn=Game.of.Thrones.S01E03.Lord.Snow.HDTV.XviD-FQM&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '4':
      { url: 'magnet:?xt=urn:btih:226YUN6KNTS5FG2YGNQQPRGU2P6RKHRE&dn=Game.of.Thrones.S01E04.Cripples.Bastards.and.Broken.Things.HDTV.XviD-FQM&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '5':
      { url: 'magnet:?xt=urn:btih:CZBRGG4J423BBUAM74EY4GRMJH3KXWQT&dn=Game.of.Thrones.S01E05.The.Wolf.and.the.Lion.HDTV.XviD-FQM&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '6':
      { url: 'magnet:?xt=urn:btih:5BWUH5EEB6V4Z36MDVN4MEV4CR4AYIFW&dn=Game.of.Thrones.S01E06.A.Golden.Crown.HDTV.XviD-FQM&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '7':
      { url: 'magnet:?xt=urn:btih:KYHJ4LSKKX747QGC5IRVUEJQ7QYMNHGT&dn=Game.of.Thrones.S01E07.HDTV.XviD-ASAP&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '9':
      { url: 'magnet:?xt=urn:btih:WRQCFWMVZWRL77HME5XJBU55YSWAZQGI&dn=Game.of.Thrones.S01E09.Baelor.HDTV.XviD-FQM&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '10':
      { url: 'magnet:?xt=urn:btih:WFKVIP6WCXAIJQWZWEFALO5N3KVN2KSK&dn=Game.of.Thrones.S01E10.Fire.and.Blood.HDTV.XviD-FQM&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 } },
  '2':
   { '2':
      { url: 'magnet:?xt=urn:btih:TOXZK2GFUSDABYXP5W2S6EF73EYBQZ72&dn=Game.of.Thrones.S02E02.HDTV.x264-ASAP&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '3':
      { url: 'magnet:?xt=urn:btih:M4SX3F3F6756ID6AAKIOI6BH23J63P25&dn=Game.of.Thrones.S02E03.HDTV.x264-ASAP&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '4':
      { url: 'magnet:?xt=urn:btih:ITBOJ5NQRWB6WQA3Q4OCSFECFBPGT6RB&dn=Game.of.Thrones.S02E04.720p.HDTV.x264-AVS&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '5':
      { url: 'magnet:?xt=urn:btih:U242CBQYQ6QO6S2XX36P5LP6BO3YKK54&dn=Game.of.Thrones.S02E05.720p.HDTV.x264-IMMERSE&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '6':
      { url: 'magnet:?xt=urn:btih:NSUVBA7FS7YF3B2GPVUZQQ6ZEVKR6QY6&dn=Game.of.Thrones.S02E06.720p.HDTV.x264-2HD&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '7':
      { url: 'magnet:?xt=urn:btih:K3FXFRDESERBLS23YGW6W57FUUEFNWEH&dn=Game.of.Thrones.S02E07.HDTV.x264-ASAP&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '8':
      { url: 'magnet:?xt=urn:btih:GSBWXXEUR2HKVJUUWVBDFAZR4MPGR5NF&dn=Game.of.Thrones.S02E08.HDTV.x264-ASAP&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '9':
      { url: 'magnet:?xt=urn:btih:32ORWWYQ327FQJQ2QRUYW53RQ3ODQYIW&dn=Game.of.Thrones.S02E09.HDTV.x264-ASAP&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '10':
      { url: 'magnet:?xt=urn:btih:PFDKQDQHRMMBMYZIUGFXCKYHZ7K6YYAN&dn=Game.of.Thrones.S02E10.HDTV.x264-ASAP&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 } },
  '3':
   { '1':
      { url: 'magnet:?xt=urn:btih:ZEG3TDC2VPTE3TL7OMGYC3TVKJBP766U&dn=Game.of.Thrones.S03E01.HDTV.x264-2HD&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '2':
      { url: 'magnet:?xt=urn:btih:JENH3QBRXIG3ASZT43MNOXCBSI3FE4LH&dn=Game.of.Thrones.S03E02.HDTV.x264-2HD&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '3':
      { url: 'magnet:?xt=urn:btih:F2VRW6OPLIVKZTERHJIYHM7KPISJJZPL&dn=Game.of.Thrones.S03E03.HDTV.x264-EVOLVE&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '4':
      { url: 'magnet:?xt=urn:btih:EXWOJMKWNHZ47JDPNH67DHXOBR4I7ABN&dn=Game.of.Thrones.S03E04.HDTV.x264-EVOLVE&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '5':
      { url: 'magnet:?xt=urn:btih:WMNQPD4ZSA4IPITQQWDMA3YCAMDQ66P4&dn=Game.of.Thrones.S03E05.HDTV.x264-2HD&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '6':
      { url: 'magnet:?xt=urn:btih:QD7F6TW646HTRLW6L4RBHAXQTWV36LMP&dn=Game.of.Thrones.S03E06.HDTV.x264-2HD&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '7':
      { url: 'magnet:?xt=urn:btih:U7GHUKS2C6PHIMPMPTO3OLBLYROXMTG5&dn=Game.of.Thrones.S03E07.HDTV.x264-2HD&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '8':
      { url: 'magnet:?xt=urn:btih:2NRVTXIXLGL2233466MB6P6LFNA5CXUC&dn=Game.of.Thrones.S03E08.HDTV.x264-EVOLVE&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '9':
      { url: 'magnet:?xt=urn:btih:SS33M4EV7USKP6KDOHFLAZWAMX63BJQX&dn=Game.of.Thrones.S03E09.720p.HDTV.x264-EVOLVE&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '10':
      { url: 'magnet:?xt=urn:btih:NIFZAWMUUXTYEE2QVZZZGBIBOPGE3KEV&dn=Game.of.Thrones.S03E10.HDTV.x264-EVOLVE&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 } },
  '4':
   { '1':
      { url: 'magnet:?xt=urn:btih:XSABXHMZOLCDFXWK7ZLECDYJFZO6CXVG&dn=Game.of.Thrones.S04E01.HDTV.x264-KILLERS&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '2':
      { url: 'magnet:?xt=urn:btih:X3KCLLMMS37YMRPEM5DWFXEGYPGREPG6&dn=Game.of.Thrones.S04E02.HDTV.x264-2HD&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '3':
      { url: 'magnet:?xt=urn:btih:YQR7ODHZYCGV3IKM6FFS5JJZI26Z46WM&dn=Game.of.Thrones.S04E03.HDTV.x264-KILLERS&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '4':
      { url: 'magnet:?xt=urn:btih:OR6JVGD7YDEF3QNP4GE7VOFTV6GQ37L2&dn=Game.of.Thrones.S04E04.HDTV.x264-KILLERS&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 },
     '5':
      { url: 'magnet:?xt=urn:btih:LJRVY2CH4FPO6XYR34QFFX2SZY2TCIZB&dn=Game.of.Thrones.S04E05.HDTV.x264-KILLERS&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80',
        seeds: 0,
        peers: 0 } },
  dateBased: false }
```
    
