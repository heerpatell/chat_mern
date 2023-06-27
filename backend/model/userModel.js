const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3, 
        max:10,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:20,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:5, 
        max:10,
    }
})

module.exports = mongoose.model("Users" , userSchema)