const mongoose = require('mongoose')
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const TransactionHistorySchema = require("../Schema/transactionSchema");

const getAllTransactionHistory = async (req, res) => {
  try {
    const allTransactionData = await TransactionHistorySchema.find({});
    res.status(200).json(allTransactionData);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching all transaction data" });
  }
};

const getOneTransactionHistory = async (req, res) => {
  try {
    const oneTransaction = await TransactionHistorySchema.findById(req.params.id);
    if (!oneTransaction) {
      return res.status(404).json({ message: "Transaction history not found" });
    }
    res.status(200).json({ message: `See transaction history for ${req.params.id}`, oneTransaction });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching single transaction history" });
  }
};


const addTransactionHistory = async (req, res) => {
    try {
      const { name, category, email, date, description, status, amount } = req.body;
  
      if (!name || !category || !email || !date || !description || !status || !amount) {
        res.status(400).json({ error: "Enter all fields" });
        return;
      }
  
      let transactionHistory = await TransactionHistorySchema.findOne({ email });
  
      if (!transactionHistory) {
        transactionHistory = new TransactionHistorySchema({
          email,
          customers: [{ name, category, transactions: [{ date, description, status, amount }] }]
        });
      } else {
        let customer = transactionHistory.customers.find(customer => customer.name === name && customer.category === category);
        if (!customer) {
          customer = { name, category, transactions: [{ date, description, status, amount }] };
          transactionHistory.customers.push(customer);
        } else {
          customer.transactions.push({ date, description, status, amount });
        }
      }
  
      await transactionHistory.save();
  
      res.status(201).json({ message: "Transaction history added", transactionHistory });
  
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Error while creating transaction history" });
    }
  };


  const updateTransactionHistory = async (req, res) => {
    try {
      const { userId, customerId, transactionId } = req.params;
      const { date, description, status, amount } = req.body;
  
      if (!date || !description || !status || !amount) {
        res.status(400).json({ error: "Enter all fields" });
        return;
      }
  
      const transactionHistory = await TransactionHistorySchema.findById(userId);
  
      if (!transactionHistory) {
        return res.status(404).json({
          message: `Transaction history not found for id ${userId}`,
        });
      }
  
      const customer = transactionHistory.customers.find(customer => customer._id == customerId);
  
      if (!customer) {
        return res.status(404).json({
          message: `Customer not found for id ${customerId}`,
        });
      }
  
      const transaction = customer.transactions.find(transaction => transaction._id == transactionId);
  
      if (!transaction) {
        return res.status(404).json({
          message: `Transaction not found for id ${transactionId}`,
        });
      }
  
      transaction.date = date;
      transaction.description = description;
      transaction.status = status;
      transaction.amount = amount;
  
      await transactionHistory.save();
  
      res.status(200).json({
        message: `Updated transaction with id ${transactionId}`,
        updatedTransaction: transaction,
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Error while updating transaction" });
    }
  };


  const deleteTransactionHistory = async (req, res) => {
    try {
      const { userId, customerId, transactionId } = req.params;

      const transactionHistory = await TransactionHistorySchema.findById(userId);

      if (!transactionHistory) {
        return res.status(404).json({
          message: `Transaction history not found for id ${userId}`,
        });
      }

      const customer = transactionHistory.customers.find(customer => customer._id == customerId);

      if (!customer) {
        return res.status(404).json({
          message: `Customer not found for id ${customerId}`,
        });
      }

      const transactionIndex = customer.transactions.findIndex(transaction => transaction._id == transactionId);

      if (transactionIndex === -1) {
        return res.status(404).json({
          message: `Transaction not found for id ${transactionId}`,
        });
      }

      customer.transactions.splice(transactionIndex, 1);
      await transactionHistory.save();

      res.status(200).json({
        message: `Deleted transaction with id ${transactionId} from customer ${customerId} in transaction history ${userId}`,
        deletedTransaction: customer.transactions[transactionIndex],
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Error while deleting transaction" });
    }
  };


module.exports = {
  getAllTransactionHistory,
  getOneTransactionHistory,
  addTransactionHistory,
  updateTransactionHistory,
  deleteTransactionHistory,
};
