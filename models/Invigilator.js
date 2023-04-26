const mongoose = require('mongoose')

const invigilatorSchema = new mongoose.Schema({
    name:{
        type: String,
        requierd: true
    },
    collageId:{
        type: String,
        requierd: true
    },
    phone:{
        type: String,
        requierd: true
    }
})
module.exports = mongoose.model('invigilator', invigilatorSchema)