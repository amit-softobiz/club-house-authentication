const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const userSchema = new Schema({
    admin:{
        type:Boolean,
        default:false,
    },
    fullname:{
        type:String,
        // required:true,
        // maxLength:50,
    },
    username:{
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
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("user", userSchema);