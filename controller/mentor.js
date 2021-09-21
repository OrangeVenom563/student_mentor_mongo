const Mentor = require('../models/mentor')
const Student = require('../models/student')

//using models to perform operations 

exports.postCreateMentor =async (req, res) => {
    const id = req.body.mentId;
    const name = req.body.mentName;
    const years_exp = req.body.exp;
   
    const mentor = new Mentor(id,name,years_exp);
    mentor.save()
    .then(result=>res.json({message:"Inserted successfully"}))
    .catch(err=>res.status(422).json({message:"error occured"}))
  };

  // exports.postRemoveStudent = (req,res)=>{
  //     const mentorId = req.body.mentId;
  //     const studentId = req.body.stuId;

  //     Mentor.removeStudent(mentorId,studentId)
  //     .then(result=>Student.removeMentor(studentId))
  //     .then(result=>res.send({message:result}))
  //     .catch(err=>console.log(err))
  // }

  // exports.postAddStudents = (req,res)=>{
  //       const mentorId = req.body.mentId;
  //       const students = req.body.students;

  //       Mentor.addStudents(mentorId,students)
  //       .then(result=>console.log(result))
  //       .then(result=>Student.addMentor(mentorId,students))
  //       .then(response=>res.json({message:response}))
  //       .catch(error=>res.send({message:error}))
  // }
  
  exports.getAllMentors = (req,res)=>{
    Mentor.getAll(mentors=> res.json({message:mentors}))
  }