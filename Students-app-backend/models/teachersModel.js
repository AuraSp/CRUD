const mongoose = require("mongoose");

const Date = {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};
// DB schema
const teachersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  subject: {
    type: String,
  },
  town: {
    type: String,
  },
  subjectGroup: {
    type: String,
  },
});

// Modelis DB lentelės pavadinimas  //Pvd. duombazeje
const Teachers = new mongoose.model("Teachers", teachersSchema);

// Duomenų siuntimas į DB
// const testTeachers = new Teachers({
//   name: "Mokytoja",
//   surname: "Mokytojauja",
//   birthdate: "1999-01-01",
//   subject: "JavaScript",
//   town: "Kaunas",
//   subjectGroup: "JS-3",
// });

// testTeachers.save();

module.exports = Teachers;