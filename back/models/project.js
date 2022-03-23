const mongoose = require('../database');

module.exports = function(app) {
    const ProjectSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }],
        creatAt: {
            type: Date,
            default: Date.now
        }
    });
    
    
    return mongoose.model('Project', ProjectSchema);
};