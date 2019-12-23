const fs = require('fs');
const config = require('./config');
const file = `${config.filePath}${config.fileName}`;

// The updateRequired module object.
var updateRequired = {};

// @name checkData
// @desc Returns true if the file is older than the fileLife variable in config.js or if the files doesn't exist (there is an error)
updateRequired.checkData = function () {

    try {
        const {mtime} = fs.statSync(file); // Get file modified date
        const fileAgeSecs = (Date.now() - mtime.valueOf())/1000;
        console.log(`File data last modified: ${mtime}`);
        console.log(`File age in seconds: ${fileAgeSecs}`);
        if (fileAgeSecs > config.fileLife) return true;
    } catch(err) {
        console.log('Its knackered ' + err);
        return true;
    }
}

module.exports = updateRequired;
