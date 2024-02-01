const express = require("express");

const mongoose = require("mongoose");

const student = require("./models/studentModel");

//MongoDB Connection String

const mongoCS =

  "mongodb+srv://rehatpreet2101:20031975Reh@fullstackclusterrehatpr.1qogxje.mongodb.net/";

try {

  const connection = mongoose.connect(mongoCS);

  console.log("MongoDB Connected!");

} catch (err) {

  console.log("MongoDB Not Connected!" + err);

}

const app = express();

app.set("view engine", "ejs");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

 

app.get("/", (req, res) => {

  student

    .find()

    .then((students) => {

      res.render("index", { students });

    })

    .catch((err) => {

      res.status(501).send({ message: err.message });

    });

});

app.post ('/delete-student/:id', (req,res) => {
  const stdId = req.params.id;

  student.findByIdAndDelete(stdId)
  .then(data => {
    console.log('Student Deleted!!' + data)
    res.redirect('/')
  })
  .catch(err => {
    res.status(501)
    .send({message : err.message})
  })
});

app.get("/add-new-student", (req, res) => {

  res.render("newStudent");

});


//save Data into mongodb post route

app.post("/add-new-student", (req, res) => {

  //create JSON Data

  const newStudent = new student({

    firstName: req.body.txtFirstName,

    lastName: req.body.textLastName,

    email: req.body.txtEmail,

    phoneNo: req.body.txtPhoneNo,

  });

  //Display JDON Object

  console.log("NEW STD >>>" + newStudent);

  //save to mongodb

  newStudent

    .save(newStudent)

    .then((data) => {

      res.redirect("/");

    })

    .catch((err) => {

      res.status(401).send({ message: err.message });

    });

});
  
app.listen(4000, () => {

  console.log(`Application Link : http://localhost:4000/`);

});