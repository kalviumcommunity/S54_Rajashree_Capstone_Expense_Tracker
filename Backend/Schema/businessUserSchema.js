const mongoose = require('mongoose');

const BusinessUser = mongoose.Schema({
    email: { type: String, required: [true, "Please Add Email Id"], unique: true },
    customers: [{
        name: { type: String, required: [true, "Please Enter Customer Name"] },
        category: { type: String, required: [true, "Please Add Category"] },
        paid: { type: Number, required: [false, "Please add paid amount"] },
        received: { type: Number, required: [false, "Please add received amount"] },
        balance: { type: Number, required: [false, "Please Add Balance"] }
    }]
});

const mongooseBusinessUserModel = mongoose.model("BusinessUser", BusinessUser);

module.exports = mongooseBusinessUserModel;
