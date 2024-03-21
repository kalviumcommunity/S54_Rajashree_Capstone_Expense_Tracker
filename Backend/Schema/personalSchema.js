const mongoose = require("mongoose");

const PersonalCategorySchema = new mongoose.Schema({
    CategoryName: String,
    MoneySpent: String,  
});

const PersonalCategory = mongoose.model("PersonalCategory", PersonalCategorySchema);

module.exports = PersonalCategory;