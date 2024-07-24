const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    cost: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);