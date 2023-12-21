const mongoose = require('mongoose');
const express = require('express');
const zod = require('zod');
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://admin:DLcUVyS2ZmhzDf24@cluster0.4y9ci33.mongodb.net/user_app");

const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);

function inputValidation(username, password) {
  const usernameSchema = zod.string().email();
  const passwordSchema = zod.string().min(7);

  const usernameResponse = usernameSchema.safeParse(username);
  const passwordResponse = passwordSchema.safeParse(password);

  return usernameResponse.success && passwordResponse.success;
}

async function userOrAdminExists(db, username) {
  const query = db.findOne({ username: username });
  const res = await query;
  return res;
}

app.post('/admin/signup', function(req, res) {
  const username = req.headers.username;
  const password = req.headers.password;

  if (userOrAdminExists(Admin, username)) {
    res.send({"msg": "Admin already exists"});
    return;
  }

  if (inputValidation(username, password)) {
    const admin = new Admin({
      username: username,
      password: password
    });
    admin.save();
    res.send({"msg": "New Admin gets successfully registered."})
  } else {
    res.status(500).send("Internal server error");
  }
})

app.post('/admin/login', async function(req, res) {
  const username = req.headers.username;
  const password = req.headers.password;

  Admin.findOne({ username: username, password: password })
       .then(result => result._id)
       .then(ans => res.send(ans));
  // const document = await query;

  // if (document) {
  //   res.send({"msg": `${username} logged in`});
  // } else {
  //   res.status(404).send({"msg": "Admin not found"});
  // }
})

app.use(function(err, req, res, next) {
  if (err) {
    res.status(500).send("Internal server error");
  } else {
    next();
  }
}) 

app.listen(3000, function() {
  console.log("Listening on port 3000");
})
