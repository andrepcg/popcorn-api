var Datastore = require('nedb');
var db = {};
db.tvshows = new Datastore({ filename: __dirname + '/data/tvshows.db', autoload: true });
db.tvshows.ensureIndex({fieldName: 'imdb_id' , unique: true });
module.exports = db;