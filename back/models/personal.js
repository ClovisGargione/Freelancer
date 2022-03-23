const mongoose = require('../database');

module.exports = function(app) {

    const AddressSchema = new mongoose.Schema({
        district: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        complement: {
            type: String
        },
        zipcode: {
            type: Number,
            required: true
        },
        reference: {
            type: String
        }
    });

    const ContactsSchema = new mongoose.Schema({
        phoneNumber: {
            type: Number
        },
        cellphone: {
            type: Number
        },
        whatsapp: {
            type: Boolean
        },
        email: {
            type: String
        }
    });

    const PersonalSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        images: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Upload'
        }],
        state: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'States',
            required: true
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cities',
            required: true
        },
        address: AddressSchema,
        professions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profession'
        }],
        description: {
            type: String
        },
        score: {
            type: Number,
            default: 0
        },
        contacts: ContactsSchema
    });
    
    
    return mongoose.model('Personal', PersonalSchema);
};