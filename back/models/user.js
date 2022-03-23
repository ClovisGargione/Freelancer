const mongoose = require('../database');
const bcrypt = require('bcryptjs');

module.exports = function(app) {
    const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        passwordResetToken: {
            type: String,
            select: false
        },
        passwordResetExpires: {
            type: Date,
            select: false
        },
        creatAt: {
            type: Date,
            default: Date.now
        }
    });
    
    UserSchema.pre('save', async function(next){
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    });
    return mongoose.model('User', UserSchema);
};