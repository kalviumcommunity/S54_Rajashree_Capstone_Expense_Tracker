const mongoose = require('mongoose')
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const UserSchema = require("../Schema/UserSchema");

const getAllUser = async (req, res) => {
    try {
      const allUserData = await UserSchema.find({});
      res.status(200).json(allUserData);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Error fetching all User data" });
    }
  };
  
  const getOneUser = async (req, res) => {
    try {
      const oneUser = await UserSchema.findById(req.params.id);
      if (!oneUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: `See user for ${req.params.id}`, oneUser });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Error fetching single user" });
    }
  };

  
  const addUserData = async (req, res) => {
    try {
        const { name, emailId, password } = req.body;

        if (!name || !emailId || !password) {
            res.status(400).json({ error: "Enter all fields" });
            return; // Return early to prevent further execution
        }

        const createUserData = await UserSchema.create({
            name,
            emailId,
            password
        });

        res.status(201).json({ message: "User created", createUserData });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error while creating" });
    }
};


  const deleteUserData = async (req, res) => {
    try {
        const deleteUser = await UserSchema.findByIdAndDelete(req.params.id);
        if (!deleteUser) {
            return res.status(404).json({
                message: `User not found for ${req.params.id}`,
            });
        }
        res.status(200).json({
            message: `Deleted User for ${req.params.id}`,
            deletedUser: deleteUser,
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error while deleting" });
    }
};
9
  
  module.exports = {
    getAllUser,
    getOneUser,
    addUserData,
    deleteUserData,
  };
  