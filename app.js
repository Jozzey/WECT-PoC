const auth = require('./auth')
const graph = require('./graph')
const updateRequired = require('./updateRequired')
const fs = require('fs')
const excludeData = require('./excludeData')
const { filePath, fileName } = require('./config')

const file = filePath + fileName

// Check to see if the file needs to be updated
if (updateRequired.checkData(file)) {
  // Get an access token for the app.
  auth.getAccessToken().then(function (token) {
    // Get all of the data from the list.
    graph.getData(token)
      .then(function (data) {
        // Write the list data to a file
        fs.writeFile(file, JSON.stringify(data), function (err) {
          if (err) throw err
          console.log('Data saved!')
        })
      }, function (err) {
        console.error('>>> Error getting list data: ' + err)
      })

    graph.getColData(token)
      .then(function (data) {
        // Remove unwanted columns from the column data
        for (let i = data.length; i--;) {
          if (data[i].readOnly === true || data[i].columnGroup !== 'Custom Columns' || excludeData.includes(data[i].name)) data.splice(i, 1)
        }
        // Write the column data to a file
        fs.writeFile(`${filePath}col_${fileName}`, JSON.stringify(data), function (err) {
          if (err) throw err
          console.log('Column data saved!')
        })
      }, function (err) {
        console.error('>>> Error getting column data: ' + err)
      })
  }, function (err) {
    console.error('>>> Error getting access token: ' + err)
  })
} else console.log('No need to update data')
