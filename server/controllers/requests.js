var mongoose = require('mongoose'),
    Match = mongoose.model('Match'),
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
 * Get one request by id
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.one = function (request, response, next) {
    var error = helpers.checkRequestParams(request.params, response, ['_id']);
    if (error) {
        return next(err);
    }

    var id = request.params['_id'];
    Request.findById(id, function (error, data) {
        helpers.genResponse(response, error, data, next);
    });
};

/**
 * Get requests by userId
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
    Request.find({'userId': userId}, function (error, data) {
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
    });
};

/**
 * Update a request
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
    Request.findByIdAndUpdate(id, request.body, function (error, data) {
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
    var error = helpers.checkRequestParams(request.params, response, ['_id']);
    if (error) {
        return next(error);
    }

    var id = request.params['_id'];
    Request.findById(id, function (error, request) {
        if (!error) {
            if (request.matchId) {
                Match.findById(request.matchId, function (error, match) {
                    if (!error) {
                        for (var i = 0; i < match.requestIds.length; i++) {
                            var requestId = match.requestIds[i];
                            if (requestId != id) {
                                Request.findByIdAndUpdate(requestId, {matchId: null});
                            }
                        }
                        match.remove();
                    } else helpers.genResponse(response, error, id, next);
                });
            }
            request.remove(function (error) {
                helpers.genResponse(response, error, id, next);
            });
        } else helpers.genResponse(response, error, id, next);
    });
};