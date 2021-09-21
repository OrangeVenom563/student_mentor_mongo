const express = require('express');
const router = express.Router();
const studentController = require('../controller/student');

// //create a student
router.post('/create-student',studentController.postCreateStudent);

// //list all students
router.get('/all-students',studentController.getAllStudents);

// //list students without mentor
router.get('/without-mentor',studentController.getStudentsWithoutMentor);

// //change mentor of a student
router.post('/change-mentor',studentController.changeMentor);

module.exports = router;