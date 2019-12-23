const fs = require('fs');
const config = require('./config');
const file = `${config.filePath}${config.fileName}`;

// The updateRequired module object.
var updateRequired = {};

updateRequired.checkData = function () {

    try {
        const {mtime} = fs.statSync(file);
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

//const {mtime} = fs.statSync(file)

//console.log(`File data   last modified: ${mtime}`)

