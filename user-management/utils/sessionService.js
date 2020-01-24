const jwt = require('jsonwebtoken');
const config = require('../configs/configs.js');

exports.generateToken = (uuid) => {
    return jwt.sign({
            uuid
        },
        config.sessionsConfigs.jwtSecret);
};

exports.decryptSsoToken = function (ssoToken) {
    try {
        return jwt.verify(ssoToken, config.sessionsConfigs.jwtSecret);
    }
    catch (err) {
        console.log(`Error occured while decrypting ssoToken :: ${err.message}`)
        return false;

    }
};