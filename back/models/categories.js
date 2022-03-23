const mongoose = require('../database');

module.exports = function(app) {
    const CategoriesSchema = new mongoose.Schema({
        key: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    });
    
    
    return mongoose.model('Categories', CategoriesSchema);
};