const mongoose = require('../database');

module.exports = function(app) {
    const TaskSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        completed: {
            type: Boolean,
            required: true,
            default: false
        },
        creatAt: {
            type: Date,
            default: Date.now
        }
    });
    
    
    return mongoose.model('Task', TaskSchema);
};