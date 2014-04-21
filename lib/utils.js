var fs = require('fs');
var path = require('path');


module.exports.getAbsoluteURI = function getAbsoluteURI(uri, origin) {
    if (uri[0] === '/' && uri[1] !== '/') {
        // Strip trailing slash.
        if (origin.substr(-1) === '/') {
            origin = substr(0, origin.length - 1);
        }
        return origin + uri;
    }
};

module.exports.mkdirRecursive = function mkdirRecursive(dir) {
    if (fs.existsSync(dir)) {
        return;
    }
    console.info('Creating directory:', dir);
    var parent = path.resolve(dir, '../');
    if (!fs.existsSync(parent)) {
        mkdirRecursive(parent);
    }
    fs.mkdirSync(dir);
};

module.exports.slugify = function slugify(text) {
    if (typeof text !== 'string') {
        return text;
    }
    return text.toString().toLowerCase()
               .replace(/\/+/g, '-')      // Replace all / with single -
               .replace(/\s+/g, '-')      // Replace spaces with -
               .replace(/[^\w\-]+/g, '')  // Remove all non-word chars
               .replace(/\-\-+/g, '-')    // Replace multiple - with single -
               .replace(/^-+/, '')        // Trim - from start of text
               .replace(/-+$/, '');       // Trim - from end of text
};
