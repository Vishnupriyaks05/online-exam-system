const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    name:{
        type: String,
        requierd: true
    },
    enrollmentNumber:{
        type: String,
        requierd: true
    },
    time:{
        type: String,
        requierd: true
    },
    questionId:{
        type: String,
        requierd: true
    },
    answerKey:{
        type: String,
        requierd: true
    }
})
module.exports = mongoose.model('examlog', logSchema)