var mongoose = require('mongoose'),
    Request = mongoose.model('Request'),
    User = mongoose.model('User'),
    helpers = require('../helpers');

/**
 * Get all users
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.all = function (request, response, next) {
    User.find(function (error, data) {
        helpers.genResponse(response, error, data, next);
    });
};

/**
 * Get one user by id
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.one = function (request, response, next) {
    var error = helpers.checkRequestParams(request.params, response, [':_id']);
    if (error) {
        return next(error);
    }

    var id = request.params['_id'];
    User.findById(id, function (error, data) {
        helpers.genResponse(response, error, data, next);
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
        helpers.genResponse(response, error, data, next);
    })
};

/**
 * Update a user
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.update = function (request, response, next) {
    var error = helpers.checkRequestParams(request.params, response, ['_id']);
    if (error) {
        return next(error);
    }

    var id = request.params['_id'];
    User.findByIdAndUpdate(id, request.body, function (error, data) {
        helpers.genResponse(response, error, request.body, next);
    });
};

/**
 * Remove a user
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.remove = function (request, response, next) {
    var error = helpers.checkRequestParams(request.params, response, ['_id']);
    if (error) {
        return next(error);
    }

    var id = request.params['_id'];
    User.remove({_id: id}, function (error) {
        if (!error) {
            Request.remove({userId: id}, function (error) {
                helpers.genResponse(response, error, id, next);
            });
        } else helpers.genResponse(response, error, id, next);
    });
};

/**
 * Logs in a user
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.login = function (request, response, next) {
    var error = helpers.checkRequestParams(request.params, response, ['email', 'password']);
    if (error) {
        return next(error);
    }

    var email = request.params['email'],
        password = request.params['password'];
    User.findOne({'email': email, 'password': password}, function (error, data) {
        helpers.genResponse(response, error, data, next);
    });
};