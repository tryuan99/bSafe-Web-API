var mongoose = require('mongoose'),
    Request = mongoose.model('Request'),
    helpers = require('../helpers');

/**
 * Get all requests
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.all = function (request, response, next) {
    Request.find(function (error, data) {
        helpers.genResponse(response, error, data, next);
    });
};

/**
 * Get requests by one user
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.user = function (request, response, next) {
    var error = helpers.checkRequestParams(request.params, response, ['userId']);
    if (error) {
        return next(err);
    }

    var userId = request.params['userId'];
    Request.find({userId: userId}, function (error, data) {
        helpers.genResponse(response, error, data, next);
    });
};

/**
 * Add a new request
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.add = function (request, response, next) {
    var error = helpers.checkRequestParams(request.params, response, ['userId']);
    if (error) {
        return next(error);
    }

    request.body.userId = request.params['userId'];
    new Request(request.body).save(function (error, data) {
        helpers.genResponse(response, error, data, next);
    })
};

/**
 * Update a request
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.update = function (request, response, next) {
    var error = helpers.checkRequestParams(request.params, response, ['userId', '_id']);
    if (error) {
        return next(error);
    }

    var userId = request.params['userId'],
        id = request.params['_id'];
    Request.update({userId: userId, _id: id}, request.body, function (error, data) {
        helpers.genResponse(response, error, request.body, next);
    });
};

/**
 * Remove a request
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.remove = function (request, response, next) {
    var error = helpers.checkRequestParams(request.params, response, ['userId', '_id']);
    if (error) {
        return next(error);
    }

    var userId = request.params['userId'],
        id = request.params['_id'];
    Request.remove({userId: userId, _id: id}, function (error) {
        helpers.genResponse(response, error, id, next);
    });
};