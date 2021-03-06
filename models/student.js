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
  static addMentor = (mentId, studsToAddMentor) => {
    const db = getDb();
    return db.collection('students')
      .updateMany({ _id: {$in:studsToAddMentor}},
        { $set: { mentor: mentId } }
      )
      .then(result=>console.log(result))
      .catch(err=>console.log(err))
  };

  //removes mentor from student
  static removeMentor = (studentId) =>{
    const db = getDb();
    return db.collection('students')
    .updateOne({_id:studentId}, {$unset:{"mentor":""}})
    .then(_=>_)
    .catch(err=>console.log(err))
  }

  //gets all the students in db
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

 //gets list of students without mentor
 static getWithoutMentor(cb){
  const db = getDb();
  return db.collection('students')
    .find({"mentor":{$exists:false}})
    .toArray()
    .then(students => cb(students))
    .catch(err => {
      console.log(err);
      cb('error occured')
    });
}
};
