const fs = require("fs");
const path = require("path");

//path for accessing file
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "mentors.json"
);

//gets file content
const getMentorsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Mentor {
  constructor(id, name, exp) {
    this.id = id;
    this.name = name;
    this.years_exp = exp;
  }

  //create new mentor
  save = () => { 
    return new Promise((resolve,reject)=>{
      getMentorsFromFile((mentors) => {
        const mentExist = mentors.find(ment=>ment.id===this.id)
        if(mentExist){
          reject("ID already exists");
          return;
        }
        mentors.push(this);
        fs.writeFile(p, JSON.stringify(mentors), (err) => {console.log(err)});
          resolve("Created successfully")
      });
    })
  }

  //removing student from existing mentor to add to new mentor
  static removeStudent(mentId, stuId) {
    return new Promise((resolve,reject)=>{
      getMentorsFromFile((mentors) => {
        const idx = mentors.findIndex(ment => ment.id === mentId);
        if(idx==-1){
          reject(false)
          return ;
        }
        const stuRemoved = mentors[idx].students.filter((stu) => stu !== stuId);
        mentors[idx].students = stuRemoved;
        fs.writeFile(p, JSON.stringify(mentors), (err) => {console.log(err)}); 
        resolve(true)
      });
    })
  }

  //adding one or more students to a mentor
  static addStudents(mentId, students) {
    return new Promise((resolve,reject)=>{
      getMentorsFromFile((mentors) => {
        const idx = mentors.findIndex((ment) => ment.id === mentId);
        if(idx===-1){
          reject("Mentor not found")
          return ;
        }
        if (!mentors[idx].students){ mentors[idx].students = []};
        mentors[idx].students.push(...students);
        fs.writeFile(p, JSON.stringify(mentors), (err) => {console.log(err)});
        resolve("Added successfully")
      });
    })
  }
  
  //gets all the mentors
  static getAll(cb){
    getMentorsFromFile(cb)
 }
};
