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

  exports.getAllMentors = (req,res)=>{
    Mentor.getAll(mentors=> res.json({message:mentors}))
  }

  exports.postAddStudents = (req,res)=>{
    const mentorId = req.body.mentId;
    const students = req.body.students;

    if(!mentorId||!students){
      res.json({message:"Add all the fields"})
    }

    Mentor.addStudents(mentorId,students)
    .then(result=>res.json({message:"Added successfully"}))
    .catch(err=>res.status(422).json({message:"Error occured"}))
  }

  exports.postRemoveStudent = (req,res)=>{
      const mentorId = req.body.mentId;
      const studentId = req.body.stuId;

      if(!mentorId||!studentId){
        res.json({message:"Add all the fields"})
      }

      Mentor.removeStudent(mentorId,studentId)
      .then(result=>res.json({message:"Removed student"}))
      .catch(err=>res.send({message:"error occured"}))
  }

 
  
  