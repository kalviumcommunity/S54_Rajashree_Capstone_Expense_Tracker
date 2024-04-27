const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    budget: {
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

const Budget = mongoose.model("Budget", BudgetSchema);

module.exports = Budget;
