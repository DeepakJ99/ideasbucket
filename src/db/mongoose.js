const { mongo } = require("mongoose")

const mongoose = require('mongoose')
var url = 'mongodb+srv://ideas-bucket:hU3ExB8sXHSRLn5@cluster0.ebtdd.mongodb.net/ideasbucket?retryWrites=true&w=majority'
mongoose.connect(url,{
    useNewUrlParser : true,
    userCreateIndex : true
})
