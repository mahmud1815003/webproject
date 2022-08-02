const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "patient", "doctor"],
        required: true,
    },
    avatar: {
        type: String,
    }
},{
    timestamp: true
});

const People = mongoose.model('people', userSchema);

module.exports = People;