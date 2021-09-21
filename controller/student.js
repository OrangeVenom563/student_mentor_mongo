const Student = require('../models/student')
const Mentor = require('../models/mentor')

//create a new student
exports.postCreateStudent = (req, res) => {
    const id = req.body.stuId;
    const name = req.body.stuName;
    const batch = req.body.batch;

    if(!id||!name||!batch){
      res.status(422).json({message:"Add all the fields"})
    }
   
    const student = new Student(id,name,batch);
    student.save()
    .then(response=>res.json({message:response}))
    .catch(err=>res.status(422).json({message:err}))
  };

  //to get all students in file
  exports.getAllStudents = (req,res)=>{
      Student.getAll(students=> res.send(students))
  }

   //get students without mentor
  exports.getStudentsWithoutMentor = (req,res)=>{
      Student.getAll(students=>{
        const woMent = students.filter(student=>!student.hasOwnProperty("mentor"))
        res.send(woMent)
      })
  }

  exports.changeMentor = (req,res)=>{
      const oldMent = req.body.mentId;
      const studentId = req.body.stuId;
      const newMentId = req.body.newMentId;

      if(!oldMent||!studentId||!newMentId){
        res.send({message:"Add all the fields"})
        return;
      }

      Mentor.removeStudent(oldMent,studentId)
      .then(result=>Mentor.addStudents(newMentId,[studentId]))
      .then(result=>Student.addMentor(newMentId,[studentId]))
      .then(result=>res.send({message:"Changed mentor Successfully"}))
      .catch(err=>console.log(err))
  }

  