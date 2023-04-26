const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        requierd: true
    },
    department:{
        type: String,
        requierd: true
    },
    collageId:{
        type: String,
        requierd: true
    },
    enrollmentNumber:{
        type: String,
        requierd: true
    },
    dob:{
        type: String,
        requierd: true
    },
    examCenter:{
        type: String,
        requierd: true
    },
    isApproved:{
        type: Boolean
    }
})
module.exports = mongoose.model('students', studentSchema)