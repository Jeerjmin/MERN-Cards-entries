const mongoose = require('mongoose');


// Define the database model
const CardsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    id: {
        type: String
    }

});

const Cards = module.exports = mongoose.model('cards', CardsSchema);
