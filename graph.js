const request = require('request');
const Q = require('q');
const {siteId, listId} = require('./config');

// The graph module object.
var graph = {};

// @name getData
// @desc Makes a request to the Microsoft Graph for all the data in the specified list.
graph.getData = function (token) {
  var deferred = Q.defer();

  // Make a request to get data from the list. Limited to a maximum of 1000 items
  // without &$top=1000 server-driven paging restricts the output to 200 items.
  request.get(`https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items?expand=fields&$top=1000`, {
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


// @name getColData
// @desc Makes a request to the Microsoft Graph for a filtered set of the lists column data.
graph.getColData = function (token) {
  var deferred = Q.defer();

  // Make a request to get column data from the list.
  request.get(`https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/columns?$select=columnGroup,displayName,name,readOnly`, {
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


module.exports = graph;
