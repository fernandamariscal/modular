// models/Goal.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shortTerm: {
        type: Boolean,
        required: true
    },
    mediumTerm: {
        type: Boolean,
        required: true
    },
    longTerm: {
        type: Boolean,
        required: true
    },
    monthlyBudget: {
        type: Boolean,
        required: true
    },
    goalType: {
        type: String,
        enum: ['house', 'car', 'phone', 'wedding', 'clothes', 'other'],
        required: true
    }
});

module.exports = mongoose.model('Goal', GoalSchema);
