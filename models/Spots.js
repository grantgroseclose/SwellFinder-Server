const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const SpotSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});








module.exports = mongoose.model('Spot', SpotSchema);

