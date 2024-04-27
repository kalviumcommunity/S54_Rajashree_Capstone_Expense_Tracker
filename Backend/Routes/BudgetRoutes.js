const express = require("express");
const budgetDataRoutes = express.Router()
const { getAllBudget, getOneBudget, addBudget,updateBudget,deleteBudget,
} = require('../Controllers/BudgetController')

budgetDataRoutes.get('/',getAllBudget)

budgetDataRoutes.get('/:id',getOneBudget)

budgetDataRoutes.post('/post',addBudget)

budgetDataRoutes.put('/:id', updateBudget)

budgetDataRoutes.delete('/delete/:id',deleteBudget)



module.exports = budgetDataRoutes