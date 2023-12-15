const fs = require('fs');

function readFromFile(src) {
  return new Promise(function(resolve) {
    fs.readFile(src, "utf-8", function(err, data) {
      resolve(data);
    })
  })
}

function writeToAFile(dest, data) {
  return new Promise(function(resolve) {
    fs.writeFile(dest, data, function() {
      resolve("Sucessfully written into a file!!!");
    })
  })
}

async function fileCleaner(src) {
  let data = await readFromFile(src);
  console.log("Successfully retrieved the data");
  console.log(data);
  data = data.split(" ").filter((val) => val !== "").join(" ");
  console.log("modifying data");
  let result = await writeToAFile(src, data);
  console.log(result);
}

fileCleaner("a.txt");