var mongoose = require('mongoose'),
    Match = mongoose.model('Match'),
    Request = mongoose.model('Request'),
    helpers = require('../helpers');

/**
 * Get all matches
 * @param {Object} request HTTP match
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.all = function (request, response, next) {
    Match.find(function (error, data) {
        helpers.genResponse(response, error, data, next);
    });
};

/**
 * Get one match by id
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
    Match.findById(id, function (error, data) {
        helpers.genResponse(response, error, data, next);
    });
};

/**
 * Get matches by requestId
 * @param {Object} request HTTP match
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.request = function (request, response, next) {
    var error = helpers.checkRequestParams(request.params, response, ['requestId']);
    if (error) {
        return next(err);
    }

    var requestId = match.params['requestId'];
    Match.find({requestId: requestId}, function (error, data) {
        helpers.genResponse(response, error, data, next);
    });
};

/**
 * Add a new match
 * @param {Object} request HTTP match
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.add = function (request, response, next) {
    var error = helpers.checkRequestParams(request.params, response, ['requestId1, requestId2']);
    if (error) {
        return next(error);
    }

    request.body['requestIds'] = [request.params['requestId1'], request.params['requestId2']];
    new Match(request.body).save(function (error, data) {
        helpers.genResponse(response, error, data, next);
    });
};

/**
 * Update a match
 * @param {Object} request HTTP match
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.update = function (request, response, next) {
    var error = helpers.checkRequestParams(request.params, response, ['_id']);
    if (error) {
        return next(error);
    }

    var id = request.params['_id'];
    Match.findByIdAndUpdate(id, request.body, function (error, data) {
        helpers.genResponse(response, error, request.body, next);
    });
};

/**
 * Remove a match
 * @param {Object} request HTTP match
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.remove = function (request, response, next) {
    var error = helpers.checkmatchParams(request.params, response, ['_id']);
    if (error) {
        return next(error);
    }

    var id = request.params['_id'];
    Match.findByIdAndRemove(id, function (error) {
        if (!error) {
            Request.find({matchId: id}, function (error, requests) {
                if (!error) {
                    for (var i = 0; i < requests.length; i++) {
                        requests[i]['matchId'] = null;
                        requests[i].save();
                    }
                    helpers.genResponse(response, error, id, next);
                } else helpers.genResponse(response, error, id, next);
            });
        } else helpers.genResponse(response, error, id, next);
    });
};