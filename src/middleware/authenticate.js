const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

//use jwt to autheticate a user whenever he/she tries to access dashboard or do any other work which requires him to be authenticated
// token has already been sent to the user and stored in the browser's cookie when user tried to login
// signature : 'random string'
// cookie-name: accesstoken

const auth = async(req,res,next)=>{
    try{
  
        const token = req.cookies.accesstoken
        const decoded = jwt.verify(token,'random string')
        const user = await User.findOne({ _id : decoded._id})

        if(!user){
            throw new Error()
        }
        req.user = user
 
        next()
    }
    catch(e){
        res.render('home',{
            alert : "<script>alert('Authentication Failed! Wrong username/password')</script>"
        })
    }
}
module.exports = auth