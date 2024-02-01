const mongoose = require('mongoose');

const Schema = mongoose.Schema

//Model

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNo: String
});

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;