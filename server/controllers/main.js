var http = require('../http');

exports.default = function (request, response, next) {
    http.genResponse(response, null, {message: 'Success'}, next);
};