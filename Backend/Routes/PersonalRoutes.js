const express = require("express");
const personalDataRoutes = express.Router()
const { getAllPersonalCategories,
    getOnePersonalCategory,
    addPersonalCategory,
    deletePersonalCategory,
} = require('../Controllers/PersonalController')

personalDataRoutes.get('/', getAllPersonalCategories)

personalDataRoutes.get('/:id', getOnePersonalCategory)

personalDataRoutes.post('/post', addPersonalCategory)

personalDataRoutes.delete('/delete/:id', deletePersonalCategory)



module.exports = personalDataRoutes