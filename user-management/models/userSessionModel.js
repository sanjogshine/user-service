const mongoose = require('mongoose');
const config = require('../configs/configs.js');

const userSessionSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true
    },
    uuid: {
        type: String,
        required: true
    },
    insertTime: {
        type: Date
    }
}, {
    timestamps: true
});

userSessionSchema.index({
    createdAt: 1
}, {
    expireAfterSeconds: config.sessionsConfigs.userSessionExpiryTimeInSeconds
});


const UserSessionSchema = mongoose.model('UserSessions', userSessionSchema);
module.exports = UserSessionSchema;