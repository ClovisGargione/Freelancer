const mongoose = require('../database');

module.exports = function(app) {
    const CitiesSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        state: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'States',
            required: true
        }
    });
    
    
    return mongoose.model('Cities', CitiesSchema);
};