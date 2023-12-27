const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', function(req, res) {
  res.send("Try routes /sum or /interest");
})

app.get('/sum', function(req, res) {
  const a = req.query.a;
  const b = req.query.b;
  const result = parseInt(a) + parseInt(b);
  res.send({result});
})

app.get('/interest', function(req, res) {
  const principal = parseInt(req.query.principal);
  const rate = parseInt(req.query.rate);
  const time = parseInt(req.query.time);

  const interest = (principal / rate) * time;
  const total = principal + interest;
  res.send({total, interest}); 
})

app.listen(PORT, function() {
  console.log(`App is listening at PORT: ${PORT}`);
})