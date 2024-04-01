const express = require("express");
const userDataRoutes = express.Router()
const { getAllUser, getOneUser, addUserData,deleteUserData,
} = require('../Controllers/UserController')

userDataRoutes.get('/',getAllUser)

userDataRoutes.get('/:id',getOneUser)

userDataRoutes.post('/post',addUserData)

userDataRoutes.delete('/delete/:id',deleteUserData)



module.exports = userDataRoutes