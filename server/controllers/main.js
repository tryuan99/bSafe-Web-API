var helpers = require('../helpers');

exports.default = function (request, response, next) {
    helpers.genResponse(response, null, {message: 'Success'}, next);
};