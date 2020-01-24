exports.dispatchResponse = function (res, statusCode, responseBody) {
    
    res.status(statusCode);

    return res.send(responseBody);
};


