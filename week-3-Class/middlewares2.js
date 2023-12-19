// What are middlewares ? -Middlewares are some functions which does pre checks that are needed.
// Middlewares make sure everything is in correct order or not..

const express = require('express');

const app = express();

app.use(express.json()); // -> use is used everywhere from this point in any of the method that gets used.
// The function express.json() is called everywhere in the route as a kind of middlewares from this point.

// Now it will be a middleware and can be used at any route that is needed.
function userAuthentication(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  if (!(username === 'admin' && password === 'admin')) {
    res.status(411).send({
      "msg": "Invalid username/password"
    })
  } else {
    next(); // next is used to change the execution from one function to another(middleware), here it wiil passes to inputValidation
  }
}

function inputValidation(req, res, next) {
  const kidneyId = req.query.kidneyId;

  if (kidneyId != 1 && kidneyId != 2) {
    res.status(411).send({
      "msg": "Invalid inputs"
    })
  } else {
    next();
  }
}

app.post('/health-checkup', userAuthentication, inputValidation, function(req, res) {
  res.send("Your heart is healthy");
})

app.post('/replace-kidney', userAuthentication, inputValidation, function(req, res) {
  res.send("Your heart is healthy");
})

// Global catches - specail type of middleware (A middleware which deals with exceptions or errors that is given out by any of the above requests)
app.use(function(err, req, res, next) {
  res.status(500).send({"msg": "Internal server error!!"});
})

app.listen(3000, function() {
  console.log("App is listening at PORT 3000");
})