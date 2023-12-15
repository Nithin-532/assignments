const fs = require('fs');

function writeToAFile(dest, data) {
  return new Promise(function(resolve) {
    fs.writeFile(dest, data, function() {
      console.log("Sucessfully written into a file!!!");
    })
    resolve();
  })
}

writeToAFile("a.txt", "Hey can you pass me this thing!!!");