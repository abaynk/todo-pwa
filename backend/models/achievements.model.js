const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementsSchema = new Schema({
    achievement: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
}); 

const Achievement = mongoose.model('Achievement', achievementsSchema);

module.exports = Achievement;