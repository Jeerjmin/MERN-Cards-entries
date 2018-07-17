const mongoose = require('mongoose');


// Define the database model
const EntriesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    idEntry: {
        type: String
    },
    idCard: {
        type: String
    }
});

const Entries = module.exports = mongoose.model('entries', EntriesSchema);
