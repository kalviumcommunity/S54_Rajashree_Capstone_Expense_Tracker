const Budget = require("../Schema/budgetSchema");

const getAllBudget = async (req, res) => {
    try {
        const allCategories = await Budget.find({});
        res.status(200).json(allCategories);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error fetching all budget" });
    }
};

const getOneBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget) {
            return res.status(404).json({ message: "budget not found" });
        }
        res.status(200).json({ message: `See budget for ${req.params.id}`, budget });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error fetching single budget" });
    }
};

const addBudget = async (req, res) => {
    try {
        const { email, budget } = req.body;

        if (!email || !budget) {
            res.status(400).json({ error: "Enter all fields" });
            return; 
        }

        const newbudget = await Budget.create({
            email,
            budget,
        });

        res.status(201).json({ message: "budget created", newbudget });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error while creating budget" });
    }
};

const updateBudget = async (req, res) => {
    try {
      const update = await Budget.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({ message: "Budget updated", update });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Error while updating" });
    }
  };


const deleteBudget = async (req, res) => {
    try {
        const deletedbudget = await Budget.findByIdAndDelete(req.params.id);
        if (!deletedbudget) {
            return res.status(404).json({
                message: `budget not found for ${req.params.id}`,
            });
        }
        res.status(200).json({
            message: `Deleted budget for ${req.params.id}`,
            deletedbudget,
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error while deleting budget" });
    }
};

module.exports = {
    getAllBudget,
    getOneBudget,
    addBudget,
    updateBudget,
    deleteBudget,
};
