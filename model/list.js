const mongoose = require('mongoose')


const listSchema = new mongoose.Schema({
    name:{
        type : String,
        required:true,
    },
    location:{
        type : String,
        required:true,
    },
    host : {
        type:String,
        required:true
    },
    rate : {
        type:Number,
        required:true
    },
    availability : {
        type:Boolean,
    },
    features : {
        type: String,
        required:true
    },
    about : {
        type:String,
        minLength : 20
    }
})

const List = mongoose.model('list',listSchema);

module.exports = List;