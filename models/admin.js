const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        requierd: true
    },
    email:{
        type: String,
        requierd: true
    },
    password:{
        type: String,
        requierd: true
    },
    phone:{
        type: String,
        requierd: true
    },
    otp:{
        type: String,
        default: null
    }
})
module.exports = mongoose.model('users', adminSchema)