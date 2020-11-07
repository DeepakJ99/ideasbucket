const mongoose = require('mongoose')
const validator = require('validator')

/*
idea has following fields:
title : String, required
Description : String
github link : String, required
lastModified : Date, required, auto-generated
*/
const ideaSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String
    },
    github:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error('is not a valid URL')
            }
        }
    },
    lastModified:{
        type:Date,
        required:true
    }
})

const Idea = mongoose.model('Idea',ideaSchema)
module.exports = Idea