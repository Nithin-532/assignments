const { Router } = require("express");
const express = require('express');
const adminMiddleware = require("../middleware/admin");
const jwt = require('jsonwebtoken');
const secretKey = '@34TYUi09#nupq1'
const { Admin, Course } = require("../db");
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
        const admin = new Admin({
            username: username,
            password: password
        });
        admin.save();
        res.json({ message: 'Admin created successfully' });
    }
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const token = jwt.sign({ username }, secretKey, { expiresIn: '2h' });
    // const token = signJwt(username, password);
    res.send({ token });
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const body = req.body;
    const course = new Course({ ...body, published: true });
    course.save();
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