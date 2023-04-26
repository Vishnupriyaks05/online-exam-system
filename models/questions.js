const mongoose = require('mongoose')

const questionsSchema = new mongoose.Schema({
    question:{
        type: String,
        requierd: true
    },
    opta:{
        type: String,
        requierd: true
    },
    optb:{
        type: String,
        requierd: true
    },
    optc:{
        type: String,
        requierd: true
    },
    optd:{
        type: String,
        requierd: true
    },
    answer:{
        type: String,
        requierd: true
    }
    
})
module.exports = mongoose.model('questions', questionsSchema)