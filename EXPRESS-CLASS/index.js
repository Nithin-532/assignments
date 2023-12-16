//Creating an http server

const express = require("express");

const app = express();

app.use(express.json());

let users = [{
  name: "John",
  kidneys: [{
    healthy: false
  }]
}];

app.get("/", function(req, res) {
  const johnKidneys = users[0].kidneys;
  const numberOfKidneys = johnKidneys.length;
  let numberOfHealthyKidneys = 0;
  for (let i = 0; i < numberOfKidneys; i++) {
    if (johnKidneys[i].healthy) {
      numberOfHealthyKidneys++;
    }
  }
  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys
  })
})

// For post request you send data in the body
app.post("/", function(req, res) {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy
  })
  res.json({
    msg: "Done!",
    users
  })
})

app.put("/", function(req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({});
})

function isThereAtLeastOneUnhealthyKidney() {
  let unhealthyKidney = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    unhealthyKidney = true;
    break;
  }
  return unhealthyKidney;
}

app.delete("/", function(req, res) {
  if (isThereAtLeastOneUnhealthyKidney()) {
    users[0].kidneys = users[0].kidneys.filter(obj => obj.healthy === true);
    res.json({msg: "done"});
  } else {
    res.status(411).json({
      msg: "You have no bad Kidneys"
    })
  }
})

app.listen(3000, function() {
  console.log("App is listening at PORT: 3000");
});