const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const initialSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    paysServices: {
        type: String,
        enum: ['si', 'no'],
        required: true
    },
    monthlyExpenses: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Initial = mongoose.model('Initial', initialSchema);

module.exports = Initial;
