const Mentor = require('../models/mentor')
const Student = require('../models/student')


//created a mentor
exports.postCreateMentor =async (req, res) => {
    const id = req.body.mentId;
    const name = req.body.mentName;
    const years_exp = req.body.exp;
   
    const mentor = new Mentor(id,name,years_exp);
    mentor.save()
    .then(_=>res.json({message:"Inserted successfully"}))
    .catch(_=>res.status(422).json({message:"error occured"}))
  };

  //gets all the mentors
  exports.getAllMentors = (req,res)=>{
    Mentor.getAll(mentors=> res.json({message:mentors}))
  }

  //adds a single or a list of students to mentor
  exports.postAddStudents = (req,res)=>{
    const mentorId = req.body.mentId;
    const students = req.body.students;

    if(!mentorId||!students){
      res.json({message:"Add all the fields"})
    }

    Mentor.addStudents(mentorId,students)
    .then(Student.addMentor(mentorId,students))
    .then(_=>res.json({message:"Added successfully"}))
    .catch(_=>res.status(422).json({message:"Error occured"}))
  }

  //removes student from mentor and mentor from student
  exports.postRemoveStudent = (req,res)=>{
      const mentorId = req.body.mentId;
      const studentId = req.body.stuId;

      if(!mentorId||!studentId){
        res.json({message:"Add all the fields"})
      }

      Mentor.removeStudent(mentorId,studentId)
      .then(_=> Student.removeMentor(studentId))
      .then(_=>res.json({message:"Removed student"}))
      .catch(_=>res.send({message:"error occured"}))
  }

 
  
  