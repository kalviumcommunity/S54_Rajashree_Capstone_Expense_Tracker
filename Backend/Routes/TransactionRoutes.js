const express = require("express");
const transactionHistoryRoutes = express.Router();
const { 
    getAllTransactionHistory,
    getOneTransactionHistory,
    addTransactionHistory,
    updateTransactionHistory,
    deleteTransactionHistory,
} = require('../Controllers/TransactionController');

transactionHistoryRoutes.get('/', getAllTransactionHistory);

transactionHistoryRoutes.get('/:id', getOneTransactionHistory);

transactionHistoryRoutes.post('/post', addTransactionHistory);

transactionHistoryRoutes.put('/put/:userId/:customerId/:transactionId', updateTransactionHistory); 

transactionHistoryRoutes.delete('/delete/:userId/:customerId/:transactionId', deleteTransactionHistory);

module.exports = transactionHistoryRoutes;
