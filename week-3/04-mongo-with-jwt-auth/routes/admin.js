const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require('jsonwebtoken');
const { Admin, Course } = require("../db");
const { SECRET_KEY } = require("../config");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const query = await Admin.findOne({ username: username });

    if (query) {
        res.status(409).send("Admin already exists");
    } else {
        await Admin.create({
            username: username,
            password: password
        });
        res.json({ message: 'Admin created successfully' });
    }
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '2h' });
    // const token = signJwt(username, password);
    res.send({ token });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    const course = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.send({ message: 'Course created successfully', courseId: course._id });
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({})
          .then(function(courses) {
            res.send({ Courses: courses });
          })
          .catch(function(err) {
            res.status(500).send("Internal server error");
          })
});

module.exports = router;