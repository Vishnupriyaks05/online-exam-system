const express = require("express")
const router = express.Router()


router.get("/", (req, res)=>{
    res.sendFile(__dirname + '/statics/index.html');
})

router.get("/invigilator/login", (req, res)=>{
    res.sendFile(__dirname + '/statics/invigilatorLogin.html');
})

router.get("/invigilator/home", (req, res)=>{
    res.sendFile(__dirname + '/statics/invigilatorHome.html');
})
router.get("/invigilator/stdValidate", (req, res)=>{
    res.sendFile(__dirname + '/statics/invigilatorValidateStudent.html');
})

router.get("/home", (req, res)=>{
    res.sendFile(__dirname + '/statics/home.html');
})

router.get("/downloads", (req, res)=>{
    res.sendFile(__dirname + '/statics/downloads.html');
})

router.get("/view/logs", (req, res)=>{
    res.sendFile(__dirname + '/statics/logs.html');
})

router.get("/view/invigilator", (req, res)=>{
    res.sendFile(__dirname + '/statics/invigilator.html');
})

router.get("/student/login", (req, res)=>{
    res.sendFile(__dirname + '/statics/studentLogin.html');
})

router.get("/exam", (req, res)=>{
    res.sendFile(__dirname + '/statics/examPage.html');
})


module.exports = router