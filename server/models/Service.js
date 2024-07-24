const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    frequency: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
