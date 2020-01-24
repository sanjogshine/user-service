const requestMissingMessage = require('../utils/constants.js').requestMissingErrorMessage;

var returnableErrorObejct = {};
returnableErrorObejct.error = {};

exports.MISSING_OR_INVALID_REQUEST_PARAMETER = function (errorMessage) {
    returnableErrorObejct.error.code = "0000";
    returnableErrorObejct.error.message = errorMessage === undefined || errorMessage === null ? requestMissingMessage : errorMessage;

    return returnableErrorObejct;
};

exports.IDENTIFIER_ALREADY_TAKEN = function () {
    returnableErrorObejct.error.code = "0001";
    returnableErrorObejct.error.message = "Identifier already taken";

    return returnableErrorObejct;
};

exports.USER_NOT_FOUND = function () {
    returnableErrorObejct.error.code = "00002";
    returnableErrorObejct.error.message = "User not found";

    return returnableErrorObejct;
};

exports.USER_AUTHENTICATION_FAILED = function () {
    returnableErrorObejct.error.code = "00003";
    returnableErrorObejct.error.message = "Authentication failed";

    return returnableErrorObejct;
};

exports.INVALID_SESSION_TOKEN = function () {
    returnableErrorObejct.error.code = "00004";
    returnableErrorObejct.error.message = "Session Token sent in request is not valid";

    return returnableErrorObejct;
};

exports.SESSION_TOKEN_EXPIRED = function () {
    returnableErrorObejct.error.code = "00004";
    returnableErrorObejct.error.message = "Session Token sent in request is expired";

    return returnableErrorObejct;
};

exports.INTERNAL_SERVER_ERROR = function () {
    returnableErrorObejct.error.code = "50000";
    returnableErrorObejct.error.message = "Internal Server Error or Exception Occurred";

    return returnableErrorObejct;
};


function extractErrors(errors) {
    var errorMessage = new Set();
    errors.forEach((errorObject) => {
        errorMessage.add(errorObject.msg);
    });

    return Array.from(errorMessage);
}

exports.throwLogicalError = function (errors) {
    var error = null;
    if (Array.isArray(errors)) {
        error = extractErrors(errors);
    }

    return error === null || error === undefined ? errors : error;
};
