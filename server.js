// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Expense = require("./models/Expense");

// Replace the following with your MongoDB Atlas connection string
const MONGO_URI = "YOUR_MONGODB_ATLAS_CONNECTION_STRING";

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.post("/api/add-expense", async (req, res) => {
  const { description, amount, category, notes } = req.body;

  try {
    const newExpense = new Expense({
      description,
      amount,
      category,
      notes,
    });

    const savedExpense = await newExpense.save();
    res.json(savedExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/expenses/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/update-expense/:id", async (req, res) => {
  const { description, amount, category, notes } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        description,
        amount,
        category,
        notes,
      },
      { new: true }
    );

    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/delete-expense/:id", async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    res.json(deletedExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// calculate the total amount of expenses
app.get("/api/total-expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    res.json({ totalExpenses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
