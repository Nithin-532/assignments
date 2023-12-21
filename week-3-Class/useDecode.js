const jwt = require("jsonwebtoken");
const secretKey = "Opowj8927@hiaeh";

const token = jwt.sign({ username: 'nithin', expiresIn: '2h' }, secretKey);
console.log(token);
const decode = jwt.decode(token);
console.log(decode);
const verify = jwt.verify(token, secretKey);
console.log(verify);