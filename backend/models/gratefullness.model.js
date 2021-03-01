const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gratefullnesSchema = new Schema({
    gratefullness: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
}); 

const Gratefullness = mongoose.model('Gratefullness', gratefullnesSchema);

module.exports = Gratefullness;