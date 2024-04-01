const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    Name: {type: String,required: [true, "Please Enter Your Name"]},
    EmailId: {type: String,required: [true, "Please Add Your e-mail address"]},
    Password: {type: String,required: [true, "Please Enter Your Password"]},
})

const mongooseUserModel = mongoose.model("Userdata", UserSchema)

module.exports = mongooseUserModel