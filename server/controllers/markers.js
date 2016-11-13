var mongoose = require('mongoose'),
    Marker = mongoose.model('Marker'),
    http = require('../http');

/**
 * Get all markers
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.all = function (request, response, next) {
    Marker.find(function (error, data) {
        http.genResponse(response, error, data, next);
    });
};

/**
 * Get one marker by id
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.one = function (request, response, next) {
    var error = http.checkRequestParams(request.params, ['_id']);
    if (error) {
        return next(error);
    }

    var id = request.params['_id'];
    Marker.findById(id, function (error, data) {
        http.genResponse(response, error, data, next);
    });
};

/**
 * Add a new marker
 * @param request
 * @param response
 * @param next
 */
exports.add = function (request, response, next) {
    new Marker(request.body).save(function (error, data) {
        http.genResponse(response, error, data, next);
    });
};

/**
 * Fetch all markers from web API
 * @param request
 * @param response
 * @param next
 */
exports.fetch = function (request, response, next) {
    // TODO: implement
};