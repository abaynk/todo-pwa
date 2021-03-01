const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainTasksSchema = new Schema({
    mainTask: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
}); 

const MainTask = mongoose.model('MainTask', mainTasksSchema);

module.exports = MainTask;
