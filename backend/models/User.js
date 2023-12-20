const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: 'Booking'
    }]
})

const User = mongoose.model('User', userSchema);
module.exports = User;