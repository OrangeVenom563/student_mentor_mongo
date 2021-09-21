const getDb = require('../utils/database').getDb;


module.exports = class Mentor {
  constructor(id, name, exp) {
    this._id = id;
    this.name = name;
    this.years_exp = exp;
  }

  //create new mentor
  save = () =>{
    const db = getDb();
    return  db.collection('mentors').insertOne(this); 
  }


//   //removing student from existing mentor to add to new mentor
  static removeStudent(mentId, stuId) {
      const db = getDb();
      return db.collection('mentors')
      .updateOne({_id:mentId}, { $pull: { students: stuId}})
  }

//   //adding one or more students to a mentor
  static addStudents(mentId, students) {
    const db = getDb();
    return db.collection('mentors')
      .updateOne({_id:mentId},  { $addToSet: { students: { $each:students } } })
  }
  
//   //gets all the mentors
  static getAll(cb){
    const db = getDb();
    return db.collection('mentors')
      .find()
      .toArray()
      .then(mentors => cb(mentors))
      .catch(err => {
        console.log(err);
        cb('error occured')
      });
 }
};


