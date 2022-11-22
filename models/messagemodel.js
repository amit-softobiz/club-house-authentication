const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const messageSchema= new Schema({
    title:{
        type:String,
        required:true,
        maxLength:50,
    },
    message:{
        type:String,
        required:true,
        maxLength:100
    },
    time:{
        type:Date
    }
})

module.exports = mongoose.model("Message", messageSchema);