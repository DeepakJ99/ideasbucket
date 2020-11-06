const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id : user._id.toString()}, 'random string')
    return token
}

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

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User',userSchema)
module.exports = User