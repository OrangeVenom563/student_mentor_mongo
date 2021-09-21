const getDb = require('../utils/database').getDb;


module.exports = class Student {
  constructor(id, name, batch) {
    this._id = id;
    this.name = name;
    this.batch = batch;
  }

  //creates new student

  save = () =>{
    const db = getDb();
    return  db.collection('students').insertOne(this); 
  }
  

  //assigns mentor to students
  // static addMentor = (mentId, studsToAddMentor) => {
  //   return new Promise((resolve,reject)=>{
  //     getStudentsFromFile((students) => {
  //       const updatedStudents = students.map((stud) => {
  //         if (studsToAddMentor.indexOf(stud.id) != -1) stud.mentor = mentId;
  //         return stud;
  //       });
  //       fs.writeFile(p, JSON.stringify(updatedStudents), (err) =>
  //         console.log(err)
  //       );
  //       resolve("Added Mentor to students")
  //     })
  //   })
  // };

  // static removeMentor = (studentId) =>{
  //   return new Promise((resolve,reject)=>{
  //     getStudentsFromFile((students)=>{
  //       const updatedStudents = students.map((stud)=>{
  //         if(stud.id==studentId) delete stud.mentor;
  //         return stud
  //       })
  //       fs.writeFile(p, JSON.stringify(updatedStudents), (err) =>
  //       console.log(err)
  //     );
  //     resolve("Removed Mentor")
  //     })
  //   })
  // }

  static getAll(cb){
    const db = getDb();
    return db.collection('students')
      .find()
      .toArray()
      .then(students => cb(students))
      .catch(err => {
        console.log(err);
        cb('error occured')
      });
 }
};
