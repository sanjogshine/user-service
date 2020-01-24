const User = require('../models/userModel');
const AppError = require('../utils/appError');
const responseDispatcher = require('../utils/responseDispatcher');
const {
    validationResult
} = require('express-validator');

exports.createUser = async (req, res) => {

    try {
        const {firstName, email} = req.body;

        //1) request body validation
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            return responseDispatcher.dispatchResponse(res, 400, AppError.MISSING_OR_INVALID_REQUEST_PARAMETER(AppError.throwLogicalError(errors.array())));
        }

        //2) check user exist or not
        const userDataFromDb = await User.find({
            $or: [{
                "firstName": firstName
            }, {
                "email": email
            }]
        });

        if (Array.isArray(userDataFromDb) && userDataFromDb.length>0) {
            return responseDispatcher.dispatchResponse(res, 400, AppError.IDENTIFIER_ALREADY_TAKEN());
        }

        //3) if user is not present createUser
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
        });

      return responseDispatcher.dispatchResponse(res, 200, {uuid:user.uuid});
        
    } catch (err) {
        //4) handle 500
        return responseDispatcher.dispatchResponse(res, 500, AppError.INTERNAL_SERVER_ERROR());
    }
};
