const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const extraTasksSchema = new Schema({
    extraTask: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
}); 

const ExtraTask = mongoose.model('ExtraTask', extraTasksSchema);

module.exports = ExtraTask;