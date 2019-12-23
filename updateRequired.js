const Q = require('q');
const config = require('./config');
const fs = require('fs');
const file = `${config.filePath}${config.fileName}`;


// The updateRequired module object.
var updateRequired = {};

// @name checkData
// @desc Checks a series of conditions to see if the data requires updating. Returns true if it does.
updateRequired.checkData = function () {
  var deferred = Q.defer();

  // Get the date last modified of the file.
  const {mtime} = fs.statSync(file);

  // Make a request to get  data from the list. Limited to a maximum of 1000 items
  // without &$top=1000 server-driven paging restricts the output to 200 items.
  request.get(`https://graph.microsoft.com/v1.0/sites/${config.siteId}/lists/${config.listId}/items?expand=fields&$top=1000`, {
    auth: {
      bearer: token
    }
  }, function (err, response, body) {
    var parsedBody = JSON.parse(body);

    if (err) {
      deferred.reject(err);
    } else if (parsedBody.error) {
      deferred.reject(parsedBody.error.message);
    } else {
      // The value of the body will be an array of the list data.
      deferred.resolve(parsedBody.value);
    }
  });

  return deferred.promise;
};


module.exports = updateRequired;
