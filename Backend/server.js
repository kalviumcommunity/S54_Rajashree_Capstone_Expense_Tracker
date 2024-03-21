const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = 3000;

    async function connectDatabase() {
        try {
            await mongoose.connect(process.env.mongoUrl);
            console.log('Connected to Database!');
        } catch (error) {
            console.error('Error connecting to Database:', error);
        }
    }

    app.use(express.json());

    app.get("/ping", (req, res) => {
        res.send("Welcome to Cashtrackrr, your all in one solution for tracking your expense.");
    });

    app.get("/", (req, res) => {
        connectDatabase()
            .then(() => {
                console.log('Connected to Database!')
            });
        res.status(200).send("Connected to Database!")
    });

    app.use((err,res) => {
        console.error(err.stack);
        res.status(500).send("Something went wrong!");
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });