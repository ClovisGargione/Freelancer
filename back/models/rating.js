const mongoose = require('../database');

module.exports = function(app) {
    const RatingSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        personal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Personal',
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    });
    
    
    return mongoose.model('Rating', RatingSchema);
};