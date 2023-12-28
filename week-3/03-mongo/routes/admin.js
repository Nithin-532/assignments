const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db");
const { Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    const query = await Admin.findOne({ username: username });

    if (query) {
        res.status(404).send({ message: "Admin already exists" });
    } else {
        await Admin.create({
            username,
            password
        })
        res.send({ message: 'Admin created successfully' });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.send({ message: 'Course created successfully', courseId: newCourse._id });
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