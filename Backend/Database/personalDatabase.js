const PersonalCategory = require("../Schema/personalSchema")
require("dotenv").config({path:'../.env'})
const mongoose = require("mongoose");


const PersonalCategory1 = new PersonalCategory({
    CategoryName:"Food",
    MoneySpent:"Rs 2000",
})
const PersonalCategory2 = new PersonalCategory({
    CategoryName:"Transport",
    MoneySpent:"Rs 1500",
})
const PersonalCategory3 = new PersonalCategory({
    CategoryName:"Health",
    MoneySpent:"Rs 500",
})
const PersonalCategory4 = new PersonalCategory({
    CategoryName:"Groceries",
    MoneySpent:"Rs 750",
})
const PersonalCategory5 = new PersonalCategory({
    CategoryName:"Others",
    MoneySpent:"Rs 1750",
})


mongoose.connect(process.env.mongoUrl)
.then(() => console.log('Connected to local MongoDB'))
.catch( err => console.error('Error connecting to local MongoDB:', err));


const PersonalCategoryData = [PersonalCategory1, PersonalCategory2, PersonalCategory3, PersonalCategory4, PersonalCategory5];


PersonalCategory.insertMany(PersonalCategoryData)
.then(() => console.log('Personal Category Data added successfully!'))
.catch(err => console.error('Error adding Personal Category Data:', err));

