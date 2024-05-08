const mongoose = require('mongoose');

const TransactionHistorySchema = mongoose.Schema({
    email: { type: String, required: [true, "Please Add Email Id"], unique: true },
    customers: [{
        name: { type: String, required: [true, "Please Add Customer Name"] },
        category: { type: String, required: [true, "Please Add Category"] },
        transactions: [{
            date: { type: String, required: [true, "Please Enter Transaction Date"] },
            description: { type: String, required: [true, "Please Add Transaction Description"] },
            status: { type: String, required: [true, "Please Add Transaction Status"] },
            amount: { type: String, required: [true, "Please Add Transaction Amount"] }
        }]
    }]
});

const TransactionHistoryModel = mongoose.model("TransactionHistory", TransactionHistorySchema);

module.exports = TransactionHistoryModel;
