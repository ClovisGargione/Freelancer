const mongoose = require('../database');

module.exports = function(app) {
    const ProfessionSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories',
            required: true
        }
    });
    
    
    return mongoose.model('Profession', ProfessionSchema);
};