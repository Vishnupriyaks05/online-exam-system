const mongoose = require('mongoose')

const examResult = new mongoose.Schema({
    name:{
        type: String,
        requierd: true
    },
    enrollmentNumber:{
        type: String,
        requierd: true
    },
    startTime:{
        type: String,
        requierd: true
    },
    endTime:{
        type: String,
        requierd: true
    },
    status:{
        type: String,
        requierd: true
    }
})
module.exports = mongoose.model('examResult', examResult)