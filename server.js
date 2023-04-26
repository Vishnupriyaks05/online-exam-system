const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/testtt', {useNewUrlParser:true})
const db = mongoose.connection
db.on('error', (error) => console.log("database connection error"))
db.once('open', ()=> console.log("database connection established"))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const authRouter = require('./routes/services')
app.use('/service', authRouter)

const views  = require('./routes/views')
app.use('', views)

app.listen(9000, ()=> console.log("server started"))