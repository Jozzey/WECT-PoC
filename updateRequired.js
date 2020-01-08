const fs = require('fs');
const {fileLife} = require('./config');

// The updateRequired module object.
var updateRequired = {};

// @name checkData
// @desc Returns true if the file is older than the fileLife variable in config.js or if the file doesn't exist (there is an error)
updateRequired.checkData = function (file) {

    try {
        const {mtime} = fs.statSync(file); // Get file modified date
        const fileAgeSecs = (Date.now() - mtime.valueOf())/1000;
        console.log(`File data last modified: ${mtime}`);
        console.log(`File age in seconds: ${fileAgeSecs}`);
        if (fileAgeSecs > fileLife) return true;
    } catch(err) {
        console.error('Unable to load existing data so it will be retrieved again - ' + err);
        return true;
    }
}

module.exports = updateRequired;
