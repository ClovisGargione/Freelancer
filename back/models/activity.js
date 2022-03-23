const mongoose = require('../database');

module.exports = function(app) {
    const ActivitySchema = new mongoose.Schema({
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
        isStarted: {
            type: Boolean,
            default: false
        },
        isConfirmed: {
            type: Boolean,
            default: false
        },
        isFinished: {
            type: Boolean,
            default: false
        },
        isCanceled: {
            type: Boolean,
            default: false
        },
        isRated: {
            type: Boolean,
            default: false
        },
        finishAt: {
            type: Date
        }
    });
    
    
    return mongoose.model('Activity', ActivitySchema);
};