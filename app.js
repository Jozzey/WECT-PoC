const auth = require('./auth');
const graph = require('./graph');
const updateRequired = require('./test');
const fs = require('fs');
const config = require('./config');

// Check to se if the file need to be updated
if (updateRequired.checkData()) {
  // Get an access token for the app.
  auth.getAccessToken().then(function (token) {
    // Get all of the data from the list.
    graph.getData(token)
      .then(function (data) {
        // Write the list data to a file
        fs.writeFile(`${config.filePath}${config.fileName}`, JSON.stringify(data), function (err) {
          if (err) throw err;
          console.log('Data saved!');
        });
      }, function (error) {
        console.error('>>> Error getting list data: ' + error);
      });
  }, function (error) {
    console.error('>>> Error getting access token: ' + error);
  });
} else console.log('No need to update data');
