const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');


const userSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuid.v4()
    },
    firstName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    lastName: {
        type: String,
        lowercase: true
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
        minLength: 6,
        select: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

// encrypt the password using 'bcryptjs'
// Mongoose -> Document Middleware
userSchema.pre('save', async function (next) {
    // check the password if it is modified
    if (!this.isModified('password')) {
        return next();
    }

    // Hashing the password
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

// This is Instance Method that is gonna be available on all documents in a certain collection
userSchema.methods.correctPassword = async function (typedPassword, originalPassword) {
    return await bcrypt.compare(typedPassword, originalPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;


