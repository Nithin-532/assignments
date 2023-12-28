const { Router } = require("express");
const router = Router();
const { User } = require("../db");
const { Course } = require("../db");
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    const query = await User.findOne({ username: username });

    if (query) {
        res.status(404).send({ message: "User already exists" });
    } else {
        await User.create({
            username: username,
            password: password
        });
        res.send({ message: 'User created successfully' });
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const response = await Course.find({});
        res.send({Courses: response});
    } catch(err) {
        res.status(500).send("Internal server error");
    }
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    User.updateOne({
        username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    });
    res.json({
        "message": "Purchase completed"
    })
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const user = User.findOne({
        username
    });

    Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    }).then(function(courses) {
        res.send({ purchasedCourses: courses });
    }).catch(function(err) {
        res.status(500).send("Internal server error");
    })
});

module.exports = router;
