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
//   static removeStudent(mentId, stuId) {
//     return new Promise((resolve,reject)=>{
//       getMentorsFromFile((mentors) => {
//         const idx = mentors.findIndex(ment => ment.id === mentId);
//         if(idx==-1){
//           reject(false)
//           return ;
//         }
//         const stuRemoved = mentors[idx].students.filter((stu) => stu !== stuId);
//         mentors[idx].students = stuRemoved;
//         fs.writeFile(p, JSON.stringify(mentors), (err) => {console.log(err)}); 
//         resolve(true)
//       });
//     })
//   }

//   //adding one or more students to a mentor
//   static addStudents(mentId, students) {
//     return new Promise((resolve,reject)=>{
//       getMentorsFromFile((mentors) => {
//         const idx = mentors.findIndex((ment) => ment.id === mentId);
//         if(idx===-1){
//           reject("Mentor not found")
//           return ;
//         }
//         if (!mentors[idx].students){ mentors[idx].students = []};
//         mentors[idx].students.push(...students);
//         fs.writeFile(p, JSON.stringify(mentors), (err) => {console.log(err)});
//         resolve("Added successfully")
//       });
//     })
//   }
  
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


