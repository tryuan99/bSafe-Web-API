var helpers = require('../helpers');

module.exports = function (app) {

    // catch 404 and forward to error handler
    app.use(function (request, response, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (error, request, response, next) {
        var status = error.status || 500;
        var message = error.message;
        helpers.sendResponse(response, status, {error: message});
    });

};