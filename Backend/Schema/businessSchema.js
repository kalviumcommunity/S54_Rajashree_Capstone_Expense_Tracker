const mongoose = require("mongoose");

const BusinessCategorySchema = new mongoose.Schema({
    CategoryName: String,
    Credit: String,
    Debit:String,
});

const BusinessCategory = mongoose.model("BusinessCategory", BusinessCategorySchema);

module.exports = BusinessCategory;