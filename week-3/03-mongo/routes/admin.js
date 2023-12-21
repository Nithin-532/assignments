const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db");
const { Course } = require("../db");
const router = Router();

let courseCount = 0;

function increaseCourseCount() {
    courseCount++;
}

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    const query = await Admin.findOne({ username: username });

    if (query) {
        res.status(404).send({ message: "Admin already exists" });
    } else {
        const admin = new Admin({
            username: username,
            password: password
        });
        admin.save();
        res.send({ message: 'Admin created successfully' });
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const body = req.body;
    const course = new Course(body);
    course.save();
    increaseCourseCount();
    let courseId = courseCount;
    res.send({ message: 'Course created successfully', courseId: courseId });
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const response = await Course.find({});
        res.send({Courses: response});
    } catch(err) {
        res.status(500).send("Internal server error");
    }
});

module.exports = router;