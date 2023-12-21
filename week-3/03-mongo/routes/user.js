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
        const user = new User({
            username: username,
            password: password
        });
        user.save();
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
    User.findOneAndUpdate({ username: username }, { $push: {purchasedCourses: courseId } }, { new: true })
        .then(function() {
            res.send({ message: 'Course purchased successfully' });
        })
        .catch(function(err) {
            res.status(500).send("Internal server error");
        });
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    User.findOne({ username: username })
        .populate("purchasedCourses")
        .exec()
        .then(function(user) {
            return user.purchasedCourses;
        })
        .then(function(courses) {
            res.send({ purchasedCourses: courses });
        })
        .catch(function(err) {
            res.status(500).send("Internal server error");
        })
});

module.exports = router;