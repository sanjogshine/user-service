const UserSessionModel = require('../models/userSessionModel');
const AppError = require('../utils/appError');
const responseDispatcher = require('../utils/responseDispatcher');
const sessionService = require('../utils/sessionService');
const {
    validationResult
} = require('express-validator');

exports.sesssionVerify = async (req, res) => {

    try {

        const {
            token
        } = req.headers;

        //1) validate req
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            console.log(`request validation failed`);

            return responseDispatcher.dispatchResponse(res, 400, AppError.MISSING_OR_INVALID_REQUEST_PARAMETER(AppError.throwLogicalError(errors.array())));
        }

        //2) token present, let's decrypt and get uuid
        const decryptedSsoToken = sessionService.decryptSsoToken(token);

        if (!decryptedSsoToken) {
            return responseDispatcher.dispatchResponse(res, 400, AppError.INVALID_SESSION_TOKEN());
        }

        const filter = {
            uuid: decryptedSsoToken.uuid
        };
        
        const update = {
            insertTime: new Date()
        };

        //3 retrive userSession, if present update or throw exception, 
        const storedToken = await UserSessionModel.find(filter);

        if (!storedToken) {
            console.log(`User session not found after searching with uuid ${decryptedSsoToken.uuid}`);

            return responseDispatcher.dispatchResponse(res, 400, AppError.SESSION_TOKEN_EXPIRED());

        }
        //update call
        await UserSessionModel.update(filter, update);

        //4) send success response
        console.log(`Successfully `);
        return responseDispatcher.dispatchResponse(res, 204, {});

    } catch (err) {
        return responseDispatcher.dispatchResponse(res, 500, AppError.INTERNAL_SERVER_ERROR());
    }

};