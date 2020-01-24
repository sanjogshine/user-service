const User = require('../models/userModel');
const UserSessionModel = require('../models/userSessionModel');
const AppError = require('../utils/appError');
const responseDispatcher = require('../utils/responseDispatcher');
const sessionService = require('../utils/sessionService');
const {
    validationResult
} = require('express-validator');

exports.login = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;

        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            console.log(`request validation failed`);
            return responseDispatcher.dispatchResponse(res, 400, AppError.MISSING_OR_INVALID_REQUEST_PARAMETER(AppError.throwLogicalError(errors.array())));
        }

        // 2) check if user exist and password is correct
        const user = await User.findOne({
            email
        }).select('+password');

        if (!user) {
            console.log(`User not found after searching with email ${email}`);
            return responseDispatcher.dispatchResponse(res, 400, AppError.USER_NOT_FOUND());

        }
        //3) match password
        if (!await user.correctPassword(password, user.password)) {
            console.log(`Incorrect user password `);
            return responseDispatcher.dispatchResponse(res, 400, AppError.USER_AUTHENTICATION_FAILED());
        }

        // 4) All correct, send jwt to client
        const ssoToken = sessionService.generateToken(user.uuid);

        const filter = {
            uuid: user.uuid
        };

        const update = {
            token: ssoToken, insertTime : new Date()
        };

        //5) upsert token -- if found update or insert // will update insert time on which ttl index is working to remove data from usersessions
        await UserSessionModel.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // Make this update into an upsert
        });
    
        //6) send success response
        console.log(`Successfully completed unpw verify`);
      return responseDispatcher.dispatchResponse(res, 200, {token:ssoToken});      

    } catch (err) {
        console.log(`Internal Server Error : Unexpected event occured`);

        return responseDispatcher.dispatchResponse(res, 500, AppError.INTERNAL_SERVER_ERROR());
    }
};