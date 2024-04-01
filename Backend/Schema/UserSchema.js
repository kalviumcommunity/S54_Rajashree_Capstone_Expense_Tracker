const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    "name": {type: String,required: [true, "Please Enter Your Name"]},
    "username": {type: String,required: [true, "Please Enter Your Username"]},
    "emailId": {type: String,required: [true, "Please Add Your e-mail address"]},
    "password": {type: String,required: [true, "Please Enter Your Password"]},
})

const mongooseUserModel = mongoose.model("Userdata", UserSchema)

module.exports = mongooseUserModel