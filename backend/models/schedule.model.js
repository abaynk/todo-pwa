const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    schedule: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
}); 

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;