const auth = require('./auth');
const graph = require('./graph');
const updateRequired = require('./updateRequired');
const fs = require('fs');
const config = require('./config');

const file = `${config.filePath}${config.fileName}`;

// Check to see if the file needs to be updated
if (updateRequired.checkData(file)) {
  // Get an access token for the app.
  auth.getAccessToken().then(function (token) {
    // Get all of the data from the list.
    graph.getData(token)
      .then(function (data) {
        // Write the list data to a file
        fs.writeFile(file, JSON.stringify(data), function (err) {
          if (err) throw err;
          console.log('Data saved!');
        });
      }, function (err) {
        console.error('>>> Error getting list data: ' + err);
      });
  }, function (err) {
    console.error('>>> Error getting access token: ' + err);
  });
} else console.log('No need to update data');
