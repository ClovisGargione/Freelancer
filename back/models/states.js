const mongoose = require('../database');

module.exports = function(app) {
    const StatesSchema = new mongoose.Schema({
        acronym: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    });
    
    
    return mongoose.model('States', StatesSchema);
};