const BusinessCategory = require("../Schema/businessSchema")
require("dotenv").config({path:'../.env'})
const mongoose = require("mongoose");


const BusinessCategory1 = new BusinessCategory({
    CategoryName:"Customer",
    Credit:"Rs 0",
    Debit:"Rs 0"
})
const BusinessCategory2 = new BusinessCategory({
    CategoryName:"Dealer",
    Credit:"Rs 0",
    Debit:"Rs 0"
})
const BusinessCategory3 = new BusinessCategory({
    CategoryName:"Supplier",
    Credit:"Rs 0",
    Debit:"Rs 0"
})


mongoose.connect(process.env.mongoUrl)
.then(() => console.log('Connected to local MongoDB'))
.catch( err => console.error('Error connecting to local MongoDB:', err));


const BusinessCategoryData = [BusinessCategory1, BusinessCategory2, BusinessCategory3];


BusinessCategory.insertMany(BusinessCategoryData)
.then(() => console.log('Business Category Data added successfully!'))
.catch(err => console.error('Error adding Business Category Data:', err));
