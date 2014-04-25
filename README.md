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

	
    
