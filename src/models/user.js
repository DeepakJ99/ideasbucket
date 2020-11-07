const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


/*
user has following fields 
username: String, required
password : String, required
*/
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('contains password')
            }
        }
    }
})

// method to generate authentication token for a user when he tries to login
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id : user._id.toString()}, 'random string')
    return token
}

//method to find a user by credentials {username, password}
userSchema.statics.findByCredentials = async(username,password)=>{
    const user = await User.findOne({username})
    if(!user){
        throw new Error('Unable to login')
        return
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
        return
    }
    else
        return user

}

//method to update a user whenever his password is modified
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User',userSchema)
module.exports = User