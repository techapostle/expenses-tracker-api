// models/Expense.js
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Mortgage/Rent",
      "Utilities",
      "Groceries",
      "Car",
      "Health",
      "Misc",
      "Entertainment",
    ],
    required: true,
  },
  notes: {
    type: String,
    default: null,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
