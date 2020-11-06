const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

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