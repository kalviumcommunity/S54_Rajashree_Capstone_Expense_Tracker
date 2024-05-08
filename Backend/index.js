const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const userDataRoutes = require("./Routes/UserRouter");
const personalDataRoutes = require("./Routes/PersonalRoutes");
const budgetDataRoutes = require("./Routes/BudgetRoutes");
const businessUserRoutes = require("./Routes/BusinessUserRoute");
const transactionRoutes = require("./Routes/TransactionRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.mongoUrl);
        console.log('Connected to Database!');
    } catch (error) {
        console.error('Error connecting to Database:', error);
        process.exit(1); 
    }
}

connectDatabase();

app.get("/", (req, res) => {
    res.send("Welcome to Cashtrackrr");
});

app.get("/ping", (req, res) => {
    res.send("Welcome to Cashtrackrr, your all-in-one solution for tracking your expenses.");
});


app.use('/userdata', userDataRoutes);
app.use('/personal', personalDataRoutes);
app.use('/budget', budgetDataRoutes);
app.use('/business', businessUserRoutes);
app.use('/transaction', transactionRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});