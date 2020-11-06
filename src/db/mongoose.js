
const mongoose = require('mongoose')
var uri = 'mongodb+srv://ideas-bucket:hU3ExB8sXHSRLn5@cluster0.ebtdd.mongodb.net/ideasbucket?retryWrites=true&w=majority'
//var url = 'mongodb+srv://ideas-bucket:hU3ExB8sXHSRLn5@cluster0.ebtdd.mongodb.net/ideasbucket?retryWrites=true&w=majority'
mongoose.connect(uri,{
    useNewUrlParser : true,
    userCreateIndex : true
})
