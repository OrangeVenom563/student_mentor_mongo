const fs = require("fs");
const path = require("path");

//file path
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "students.json"
);

//reading from file
const getStudentsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Student {
  constructor(id, name, batch) {
    this.id = id;
    this.name = name;
    this.batch = batch;
  }

  //creates new student
  save() {
      return new Promise((resolve, reject) => {
        getStudentsFromFile((students) => {
        const studExists = students.find((stud) => stud.id === this.id);
        if (studExists) {
          reject("Student already exist with given ID");
          return;
        }
        students.push(this);
        fs.writeFile(p, JSON.stringify(students), (err) => console.log(err));
        resolve("Added student successfully");
      });
    });
  }

  //assigns mentor to students
  static addMentor = (mentId, studsToAddMentor) => {
    return new Promise((resolve,reject)=>{
      getStudentsFromFile((students) => {
        const updatedStudents = students.map((stud) => {
          if (studsToAddMentor.indexOf(stud.id) != -1) stud.mentor = mentId;
          return stud;
        });
        fs.writeFile(p, JSON.stringify(updatedStudents), (err) =>
          console.log(err)
        );
        resolve("Added Mentor to students")
      })
    })
  };

  static removeMentor = (studentId) =>{
    return new Promise((resolve,reject)=>{
      getStudentsFromFile((students)=>{
        const updatedStudents = students.map((stud)=>{
          if(stud.id==studentId) delete stud.mentor;
          return stud
        })
        fs.writeFile(p, JSON.stringify(updatedStudents), (err) =>
        console.log(err)
      );
      resolve("Removed Mentor")
      })
    })
  }

  static getAll(cb) {
    getStudentsFromFile(cb);
  }
};
