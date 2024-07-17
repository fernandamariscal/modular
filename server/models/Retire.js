const mongoose = require('mongoose');

const RetireSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    retirementPlan: { type: String, required: true },
    spenderPerson: { type: String, required: true }
});

const Retire = mongoose.model('Retire', RetireSchema);

module.exports = Retire;
