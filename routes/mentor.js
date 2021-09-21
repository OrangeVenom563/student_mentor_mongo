const express = require('express');
const router = express.Router();
const mentorController = require('../controller/mentor');

//create a new mentor
router.post('/create-mentor',mentorController.postCreateMentor);

//remove a student from mentor to assign student to other mentor
router.post('/remove-student',mentorController.postRemoveStudent);

//assign a student of multiple students to a mentor
router.post('/add-student',mentorController.postAddStudents);

//send list of all mentors
router.get('/all-mentors',mentorController.getAllMentors)


module.exports = router;