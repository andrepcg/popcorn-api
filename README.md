# popocorn-api

Scrape torrents from eztv and generate a local database accessible with an api compatible with popcorn time.


## Installation

* `npm install`
* `node app.js`


## Sample Usage

We automatically generate the DB on start and we resync with eztv everyday at 00:00

### Access api

	#### View all shows
    ```
    http://localhost:5000/shows/[page]
    ```

	#### Search
    ```
    http://localhost:5000/search/[keyword]
    ```

	#### Show detail
    ```
    http://localhost:5000/show/[imdb_id]
    ```
    