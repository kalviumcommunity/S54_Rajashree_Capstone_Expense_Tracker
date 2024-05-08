const mongoose = require('mongoose')
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const BusinessUserSchema = require("../Schema/businessUserSchema");

const getAllBusinessUser = async (req, res) => {
  try {
    const allUserData = await BusinessUserSchema.find({});
    res.status(200).json(allUserData);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching all User data" });
  }
};

const getOneBusinessUser = async (req, res) => {
  try {
    const oneUser = await BusinessUserSchema.findById(req.params.id);
    if (!oneUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: `See user for ${req.params.id}`, oneUser });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching single user" });
  }
};

const addBusinessUser = async (req, res) => {
  try {
    const { name, category, email,paid,received,balance } = req.body;

    if (!name || !category || !email) {
      res.status(400).json({ error: "Enter all fields" });
      return;
    }

    let businessUser = await BusinessUserSchema.findOne({ email });

    if (!businessUser) {
      businessUser = new BusinessUserSchema({
        email,
        customers: [{
          name,
          category,
          paid,
          received,
          balance
        }]
      });
    } else {
      businessUser.customers.push({
        name,
        category,
        paid,
        received,
        balance
      });
    }

    await businessUser.save();

    res.status(201).json({ message: "User added", businessUser });

  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error while creating" });
  }
};

const updateBusinessUser = async (req, res) => {
  try {
    const { userId, customerId } = req.params;
    const { paid, received } = req.body;

    const businessUser = await BusinessUserSchema.findById(userId);

    if (!businessUser) {
      return res.status(404).json({
        message: `User not found for id ${userId}`,
      });
    }

    const customerIndex = businessUser.customers.findIndex(customer => customer._id == customerId);

    if (customerIndex === -1) {
      return res.status(404).json({
        message: `Customer not found for id ${customerId}`,
      });
    }

    businessUser.customers[customerIndex].paid = paid;
    businessUser.customers[customerIndex].received = received;
    businessUser.customers[customerIndex].balance = parseFloat(received) - parseFloat(paid);

    await businessUser.save();

    res.status(200).json({
      message: `Updated customer with id ${customerId} from user ${userId}`,
      updatedCustomer: businessUser.customers[customerIndex],
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error while updating customer" });
  }
};

const deleteBusinessUser = async (req, res) => {
  try {
    const { userId, customerId } = req.params;

    const businessUser = await BusinessUserSchema.findById(userId);

    if (!businessUser) {
      return res.status(404).json({
        message: `User not found for id ${userId}`,
      });
    }

    const customerIndex = businessUser.customers.findIndex(customer => customer._id == customerId);

    if (customerIndex === -1) {
      return res.status(404).json({
        message: `Customer not found for id ${customerId}`,
      });
    }

    businessUser.customers.splice(customerIndex, 1);
    await businessUser.save();

    res.status(200).json({
      message: `Deleted customer with id ${customerId} from user ${userId}`,
      deletedCustomer: businessUser.customers[customerIndex],
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error while deleting customer" });
  }
};


module.exports = {
  getAllBusinessUser,
  getOneBusinessUser,
  updateBusinessUser,
  addBusinessUser,
  deleteBusinessUser,
};
