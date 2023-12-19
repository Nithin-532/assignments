const express = require('express');

const app = express();

// Consider we need to get something like number of kidneys and username and password from the user/patient.
app.post('/health-checkup', function(req, res) {
  const kidneyId = req.query.kidneyId;
  const username = req.headers.username;
  const password = req.headers.password;
  console.log(kidneyId);

  // Authentication
  if (!(username === 'admin' && password === 'admin')) {
    res.status(411).send({
      "msg": "Invalid username/password"
    })
  }

  // Input Validation
  if (kidneyId != 1 && kidneyId != 2) {
    res.status(411).send({
      "msg": "Invalid inputs"
    })
  }

  res.send("Your heart is healthy");
})

// Let us consider we need another route /replace-kidney and the authentication and input validation needed to be
// checked again. It results in code repetition, so to counter this thing we need to use middlewares.

app.post('/replace-kidney', function(req, res) {
  const kidneyId = req.query.kidneyId;
  const username = req.headers.username;
  const password = req.headers.password;
  console.log(kidneyId);

  // Authentication
  if (!(username === 'admin' && password === 'admin')) {
    res.status(411).send({
      "msg": "Invalid username/password"
    })
  }

  // Input Validation
  if (kidneyId != 1 && kidneyId != 2) {
    res.status(411).send({
      "msg": "Invalid inputs"
    })
  }

  res.send("Your heart is healthy");
})


app.listen(3000, function() {
  console.log("App is listening at PORT 3000");
})