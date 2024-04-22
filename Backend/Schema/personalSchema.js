const mongoose = require("mongoose");

const PersonalCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    spent: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now  
    },
    month: {
        type: String,
        default: () => {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return monthNames[new Date().getMonth()];
        }
    }
});

const PersonalCategory = mongoose.model("PersonalCategory", PersonalCategorySchema);

module.exports = PersonalCategory;
