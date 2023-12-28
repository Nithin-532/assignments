const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { SECRET_KEY } = require("../config");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const query = await User.findOne({ username: username });
    if (query) {
        res.status(409).send("User already exists");
    } else {
        await User.create({
            username,
            password
        });
        res.send({ message: 'User created successfully' });
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const query = await User.findOne({ username: username, password: password });
    if (query) {
        const token = jwt.sign({ username }, SECRET_KEY);
        // const token = signJwt(username, password);
        res.send({ token });
    } else {
        res.status(404).send("User not found");
    }
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({})
          .then(function(courses) {
            res.send({ Courses: courses });
          })
          .catch(function(err) {
            res.status(500).send("Internal server error");
          })
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE3MDMxODE0MzN9.9e7UqfSwW9Fo-G91N0ActjV8I7xvihpFUdDY0AaYOQg

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;

    User.updateOne({ username }, { "$push": {purchasedCourses: courseId }})
        .then(function() {
            res.send({ message: 'Course purchased successfully' });
        })
        .catch(function(err) {
            res.status(500).send("Internal server error");
        })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;

    try {
        const user = await User.findOne({ username });
        const courses = await Course.find({
            _id: {
                "$in": user.purchasedCourses,
            }
        })
        res.send({
            Courses: courses
        })
    } catch(err) {
        res.status(500).send({"message": "Internal server error"});
    }

    
});

module.exports = router;
