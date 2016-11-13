var mongoose = require('mongoose'),
    Request = mongoose.model('Request'),
    User = mongoose.model('User'),
    http = require('../http');

/**
 * Get all users
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.all = function (request, response, next) {
    User.find({}, '_id firstName lastName', function (error, data) {
        http.genResponse(response, error, data, next);
    });
};

/**
 * Get one user by id
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
    User.findById(id, '_id firstName lastName', function (error, data) {
        http.genResponse(response, error, data, next);
    });
};

/**
 * Add a new user
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.add = function (request, response, next) {
    new User(request.body).save(function (error, data) {
        http.genResponse(response, error, data, next);
    })
};

/**
 * Update a user
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.update = function (request, response, next) {
    var error = http.checkRequestParams(request.params, ['_id']);
    if (error) {
        return next(error);
    }

    var id = request.params['_id'];
    User.findByIdAndUpdate(id, request.body, function (error, data) {
        http.genResponse(response, error, request.body, next);
    });
};

/**
 * Remove a user
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.remove = function (request, response, next) {
    var error = http.checkRequestParams(request.params, ['_id']);
    if (error) {
        return next(error);
    }

    var id = request.params['_id'];
    User.remove({_id: id}, function (error) {
        if (!error) {
            Request.remove({userId: id}, function (error) {
                http.genResponse(response, error, id, next);
            });
        } else http.genResponse(response, error, id, next);
    });
};

/**
 * Logs in a user
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.login = function (request, response, next) {
    var error = http.checkRequestParams(request.body, ['email', 'password']);
    if (error) {
        return next(error);
    }

    var email = request.body['email'],
        password = request.body['password'];
    User.findOne({'email': email, 'password': password}, '_id firstName lastName', function (error, data) {
        http.genResponse(response, error, data, next);
    });
};