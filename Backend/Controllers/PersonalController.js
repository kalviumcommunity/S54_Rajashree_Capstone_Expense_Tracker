const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const PersonalCategory = require("../Schema/personalSchema");

const getAllPersonalCategories = async (req, res) => {
    try {
        const allCategories = await PersonalCategory.find({});
        res.status(200).json(allCategories);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error fetching all Personal Categories" });
    }
};

const getOnePersonalCategory = async (req, res) => {
    try {
        const category = await PersonalCategory.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: `See category for ${req.params.id}`, category });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error fetching single category" });
    }
};

const addPersonalCategory = async (req, res) => {
    try {
        const { name, budget, category, spent } = req.body;

        if (!name || !budget || !category || !spent) {
            res.status(400).json({ error: "Enter all fields" });
            return; // Return early to prevent further execution
        }

        // Get the current date
        const currentDate = new Date();

        // Get the current month name
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const currentMonth = monthNames[currentDate.getMonth()];

        // Create a new category with the current date and month
        const newCategory = await PersonalCategory.create({
            name,
            budget,
            category,
            spent,
            date: currentDate,
            month: currentMonth
        });

        res.status(201).json({ message: "Personal Category created", newCategory });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error while creating Personal Category" });
    }
};



const deletePersonalCategory = async (req, res) => {
    try {
        const deletedCategory = await PersonalCategory.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({
                message: `Category not found for ${req.params.id}`,
            });
        }
        res.status(200).json({
            message: `Deleted Category for ${req.params.id}`,
            deletedCategory,
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error while deleting Personal Category" });
    }
};

module.exports = {
    getAllPersonalCategories,
    getOnePersonalCategory,
    addPersonalCategory,
    deletePersonalCategory,
};
