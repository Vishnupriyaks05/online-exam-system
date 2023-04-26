const express = require("express")
const Admin = require("../models/admin")
const Invigilator = require('../models/Invigilator')
const Questions = require('../models/questions')
const Students = require('../models/students')
const examLogs = require('../models/log')
const twilio = require('twilio')
const pdf = require('pdfkit');
const router = express.Router()

const accountSid = 'ACc31e6277e180d741f787a7a6952bd843'; // Your Account SID from www.twilio.com/console
const authToken = 'c4d4c1f0ff8ac9f208e2f9f8a4f6485a'; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);


//add question
router.post('/question', async (req, res) =>{
    const question = new Questions({
        question: req.body.question,
        opta: req.body.opta,
        optb: req.body.optb,
        optc: req.body.optc,
        optd: req.body.optd,
        answer: req.body.answer
    })
    try{
        const newQuestion = await question.save()
        res.status(201).send("new question added")
    }catch(err){
        res.status(400).json({msg: err.message})
    }
})

//add demo admin
router.post('/admin', async (req, res)=>{
    const existingAdmin = await Admin.exists({phone: req.body.phone})
    if(!existingAdmin){
        const user = new Admin({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            phone: req.body.phone,
            password: req.body.password
        })
        try{
            const newUser = await user.save()
            res.status(201).send("new admin added")
        }catch(err){
            res.status(400).json({msg: err.message})
        }
    }else{
        res.status(409).json({msg: "user already in database"})
    }
})

//add invigilator
router.post('/invigilator', async (req, res)=>{
    var query = {}; 
    query.phone = req.body.phone
    query.collageId = req.body.collageId
    const existingInvigilator = await Invigilator.exists(query)
    if(!existingInvigilator){
        const invigilator = new Invigilator({
            name: req.body.name,
            collageId: req.body.collageId,
            phone: req.body.phone
        })
        try{
            const newinvigilator = await invigilator.save()
            res.status(201).send("new invigilator added")
        }catch(err){
            res.status(400).json({msg: err.message})
        }
    }else{
        res.status(409).json({msg: "user already in database"})
    }
})

//list invigilator
router.get('/invigilator', async (req, res)=>{
    try{
        const existingInvigilators = await Invigilator.find()
        res.status(200).json({result: existingInvigilators})
    }catch{
        res.status(500).json({msg: "error to collect list"})
    }
})


//add student
router.post('/student', async (req, res)=>{
    var query = {}; 
    query.enrollmentNumber = req.body.enrollmentNumber
    const existingStudent = await Students.exists(query)

    if(!existingStudent){
        const student = new Students({
            name: req.body.name,
            collageId: req.body.collageId,
            department: req.body.department,
            enrollmentNumber: req.body.enrollmentNumber,
            examCenter: req.body.examCenter,
            dob: req.body.dob,
            isApproved: req.body.isApproved
        })
        try{
            const newStudent = await student.save()
            res.status(201).send("new student added")
        }catch(err){
            res.status(400).json({msg: err.message})
        }
    }else{
        res.status(409).json({msg: "student already in database"})
    }
})


//login admin
router.post('/auth/admin',async (req, res)=>{
    console.log(req.body.email)
    console.log(req.body.password)
    var query = {}; 
    query.email = req.body.email
    const admin = await Admin.exists(query)
    if(admin){
        const phoneNumber = await Admin.find(query)
        query = {}; 
        query.password = req.body.password
        const adminPassword = await Admin.exists(query)
        if(adminPassword){
            client.messages
            .create({
                body: 'TEST OTP IS : 102030',
                to: '+91'+phoneNumber[0].phone,
                from: '+15076290179', 
            })
            res.status(200).json({phone: "otp send"})
        }else{
            res.status(401).json({msg: "auth failed"})
        }
    }else{
        res.status(409).json({msg: "user not registerd"})
    }
})


//login invigilator
router.post('/auth/invigilator',async (req, res)=>{
    var query = {}; 
    query.collageId = req.body.collageId
    console.log(query)
    const invigilator = await Invigilator.exists(query)
    if(invigilator){    
        res.status(200).json({phone: "ok"})
    }else{
        res.status(409).json({msg: "user not registerd"})
    }
})


//get student list
router.get('/student-list', async (req, res)=>{
    try{
        const data = await Students.find()
        res.status(200).json({result: data})
    }catch{
        res.status(500).json({msg: "error to collect list"})
    }
})

//check student 
router.post('/check-student',async (req, res)=>{
   
    var query = {}; 
    query.enrollmentNumber = req.body.enrollmentNumber
    const Exisitstudent = await Students.exists(query)
    if(Exisitstudent){
        const student = await Students.find(query)
        res.status(200).json(student)
    }else{
        res.status(404).json({msg: "student not registerd"})
    }
})

//student login
router.post('/auth/student',async (req, res)=>{
    var query = {}; 
    query.enrollmentNumber = req.body.enrollmentNumber
    query.dob = req.body.dob
    const Exisitstudent = await Students.exists(query)
    if(Exisitstudent){
        const student = await Students.find(query)
        res.status(200).json(student)
    }else{
        res.status(404).json({msg: "student not registerd"})
    }
})

//get question for student
router.get('/student/questions',async (req, res)=>{
    const questions = await Questions.find()
    res.status(200).json(questions)
})

//exam log update
router.post('/examlog/update', async (req, res) => {
    const enrollmentNumber = req.body.enrollmentNumber;
    const query = { enrollmentNumber };
  
    try {
      const existingStudent = await Students.exists(query);
  
      if (existingStudent) {
        const update = {
          name: req.body.name,
          time: req.body.time,
          questionId: req.body.questionId,
          answerKey: req.body.answerKey
        };
        const options = { new: true, upsert: true };
        const log = await examLogs.findOneAndUpdate(query, update, options);
        res.json({ msg: "Log updated successfully", data: log });
      } else {
        const log = new examLogs(req.body);
        const savedLog = await log.save();
        res.json({ msg: "Log created successfully", data: savedLog });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error updating log" });
    }
  });
  

//approve or denay student
router.post('/student/status/update', async (req, res) => {
    const enrollmentNumber = req.body.enrollmentNumber;
    const query = { enrollmentNumber };
    try {
      const existingStudent = await Students.exists(query);
  
      if (existingStudent) {
        const update = {
          isApproved : req.body.status,
        };
        const options = { new: true, upsert: true };
        const log = await Students.findOneAndUpdate(query, update, options);
        res.json({ msg: "Student status updated successfully", data: log });
      } 
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error updating status" });
    }
  });

//get log
router.get('/examlog/get',async (req, res)=>{
    const examlogs = await examLogs.find()
    res.status(200).json(examlogs)
})

//download student pdf
router.get('/student-pdf', async (req, res)=>{
    const data = await Students.find()
    const pdfDoc = new pdf();
  // Add content to the PDF document
  pdfDoc.text("Student list");
  for(var i=0; i<data.length; i++){
        pdfDoc.text("name : "+data[i].name+" department : "+data[i].department+" collageId: "+data[i].collageId+" enrollmentNumber: "+data[i].enrollmentNumber);
        pdfDoc.text('\n')
  }
  // End the PDF document
  pdfDoc.end();
  // Send the PDF document to the user as a download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
  pdfDoc.pipe(res);
})


//download questions pdf
router.get('/questions-pdf', async (req, res)=>{
    const data = await Questions.find()
    const pdfDoc = new pdf();
  // Add content to the PDF document
  pdfDoc.text("Student list");
  pdfDoc.text(data)
  // End the PDF document
  pdfDoc.end();
  // Send the PDF document to the user as a download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
  pdfDoc.pipe(res);
})



module.exports = router