const express = require('express');
const zod = require('zod');

const app = express();
const schema = zod.array(zod.number());

app.use(express.json());

// function validateInput(obj) {
//   const validateSchema = zod.object({
//     email: zod.string().email(),
//     password: zod.string().min(8)
//   })

//   const response = validateSchema.safeParse(obj);
//   console.log(response);
// }

// validateInput({
//   email: "abc@gmai",
//   password: "tuuihgdiush"
// })

app.post('/health-checkup', function(req, res) {
  const kidneys = req.body.kidneys; // array of numbers (kidneys = [1, 2])
  const response = schema.safeParse(kidneys);
  res.send({
    response
  });
})

app.listen(3000, function() {
  console.log("App is listening on PORT 3000");
})