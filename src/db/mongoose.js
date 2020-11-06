const { mongo } = require("mongoose")

const mongoose = require('mongoose')
var url = process.env.MONGOLAB_URI;
mongoose.connect(url,{
    useNewUrlParser : true,
    userCreateIndex : true
})
