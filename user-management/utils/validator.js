/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */
const {
   check
} = require('express-validator')
const requestMissingMessage = require('../utils/constants.js').requestMissingErrorMessageForParameter;

exports.validate = (method) => {
   switch (method) {
      case 'createUser': {
         return [
            check('firstName', requestMissingMessage + 'firstName').exists(),
            check('lastName', requestMissingMessage + 'lastName'),
            check('email', requestMissingMessage + 'email').exists().isEmail(),
            check('phone', requestMissingMessage + 'phone').optional().isMobilePhone(),
            check("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
         ];
      }
      case 'unpw': {
         return [
            check('email', requestMissingMessage + 'email').exists().isEmail(),
            check('password', requestMissingMessage + 'Password').exists()
         ];
      }
      case 'verifySession': {
         return [check('token', requestMissingMessage + 'token').exists().isJWT()];
      }
   }
};