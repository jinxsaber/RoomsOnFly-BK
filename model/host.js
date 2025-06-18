const mongoose = require('mongoose');
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowercase : true,
        unique:true,
        validate : [isEmail,'Invalid Email']
    },
    password:{
        type:String,
        required:true,
        minlength:[8,'Password must be minimum 8 characters long']
    }
})

const Host = mongoose.model('host',userSchema);

module.exports = Host;