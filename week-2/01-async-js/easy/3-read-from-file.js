const fs = require("fs");

function readFromFile(src) {
  return new Promise(function(resolve) {
    fs.readFile(src, "utf-8", function(err, data) {
      console.log(data);
    })
  })
}

readFromFile("a.txt");