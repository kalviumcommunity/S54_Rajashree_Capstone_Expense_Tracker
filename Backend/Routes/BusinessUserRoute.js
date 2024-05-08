const express = require("express");
const businessUserRoutes = express.Router()
const { getAllBusinessUser, getOneBusinessUser, addBusinessUser,updateBusinessUser,deleteBusinessUser,
} = require('../Controllers/BusinessUser')

businessUserRoutes.get('/',getAllBusinessUser)

businessUserRoutes.get('/:id',getOneBusinessUser)

businessUserRoutes.post('/post',addBusinessUser)

businessUserRoutes.put("/put/:userId/:customerId", updateBusinessUser);

businessUserRoutes.delete("/delete/:userId/:customerId", deleteBusinessUser);


module.exports = businessUserRoutes