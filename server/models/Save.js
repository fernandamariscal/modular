const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saveSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    hasSpecificGoal: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    weeklySavings: { type: Number, required: true }
}, {
    timestamps: true
});

const Save = mongoose.model('Save', saveSchema);
module.exports = Save;
