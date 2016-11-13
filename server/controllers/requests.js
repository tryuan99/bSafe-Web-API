var mongoose = require('mongoose'),
    Match = mongoose.model('Match'),
    Request = mongoose.model('Request'),
    http = require('../http');

/**
 * Get all requests
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.all = function (request, response, next) {
    Request.find(function (error, data) {
        http.genResponse(response, error, data, next);
    });
};

/**
 * Get one request by id
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.one = function (request, response, next) {
    var error = http.checkRequestParams(request.params, ['_id']);
    if (error) {
        return next(err);
    }

    var id = request.params['_id'];
    Request.findById(id, function (error, data) {
        http.genResponse(response, error, data, next);
    });
};

/**
 * Get requests by userId
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.user = function (request, response, next) {
    var error = http.checkRequestParams(request.params, ['userId']);
    if (error) {
        return next(err);
    }

    var userId = request.params['userId'];
    Request.find({'userId': userId}, function (error, data) {
        http.genResponse(response, error, data, next);
    });
};

/**
 * Add a new request
 * @param {Object} request HTTP request
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.add = function (request, response, next) {
    new Request(request.body).save(function (error, data) {
        http.genResponse(response, error, data, next);
    });
};

/**
 * Update a request
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
    Request.findByIdAndUpdate(id, request.body, function (error, data) {
        http.genResponse(response, error, request.body, next);
    });
};

/**
 * Remove a request
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
    Request.findById(id, function (error, request) {
        if (!error) {
            var matchId = request.matchId;
            request.remove(function (error) {
                if (!error) {
                    if (matchId) {
                        Match.findById(matchId, function (error, match) {
                            if (!error) {
                                var actions = match.requestIds.map(function (requestId) {
                                    return Request.findByIdAndUpdate(requestId, {'matchId': null}).exec();
                                });
                                match.remove(function (error) {
                                    if (!error) {
                                        Promise.all(actions).then(function (resolve, reject) {
                                            http.genResponse(response, reject, id, next);
                                        });
                                    } else http.genResponse(response, error, id, next);
                                });
                            } else http.genResponse(response, error, id, next);
                        });
                    } else http.genResponse(response, error, id, next);
                } else http.genResponse(response, error, id, next);
            });
        } else http.genResponse(response, error, id, next);
    });
};