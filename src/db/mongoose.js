
const mongoose = require('mongoose')


//this url connects the application to database at mongodbAtlas, uses mongooose middleware
//username : ideas-bucket
//password : hU3ExB8sXHSRLn5
//database : ideasbucket

var uri = 'mongodb+srv://ideas-bucket:hU3ExB8sXHSRLn5@cluster0.ebtdd.mongodb.net/ideasbucket?retryWrites=true&w=majority'
mongoose.connect(uri,{
    useNewUrlParser : true,
    userCreateIndex : true
})
