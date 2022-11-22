const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema= new Schema({
    fullname:{
        type:String,
        // required:true,
        // maxLength:50,
    },
    email:{
        type:String,
        // unique:true,
        // required:true,
        // maxLength:50
    },
    password:{
        type:String,
        // required:true,
        // minLength:8,
        // maxLength:50
    },
    membership_status:{
        type:String
    }
})

module.exports = mongoose.model("user", userSchema);