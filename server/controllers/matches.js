var mongoose = require('mongoose'),
    Match = mongoose.model('Match'),
    Request = mongoose.model('Request'),
    http = require('../http'),
    matching = require('../algorithms/match');

/**
 * Get all matches
 * @param {Object} request HTTP match
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.all = function (request, response, next) {
    Match.find(function (error, data) {
        http.genResponse(response, error, data, next);
    });
};

/**
 * Get one match by id
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
    Match.findById(id, function (error, data) {
        http.genResponse(response, error, data, next);
    });
};

/**
 * Get matches by requestId
 * @param {Object} request HTTP match
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.request = function (request, response, next) {
    var error = http.checkRequestParams(request.params, ['requestId']);
    if (error) {
        return next(err);
    }

    var requestId = request.params['requestId'];
    Match.findOne({'requestId': requestId}, function (error, data) {
        http.genResponse(response, error, data, next);
    });
};

/**
 * Add a new match
 * @param {Object} request HTTP match
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.add = function (request, response, next) {
    var error = http.checkRequestParams(request.body, ['requestId']);
    if (error) {
        return next(error);
    }

    var requestId = request.body['requestId'];
    Request.find({'matchId': null}, function (error, requests) {
        if (!error) {
            var currentRequest = requests.find(function (request) {
                return request._id == requestId;
            });

            if (currentRequest) {
                var matchingRequest = matching.findMatchingRequest(currentRequest, requests.filter(function (request) {
                    return request._id != requestId;
                }));

                if (matchingRequest) {
                    var match = {};
                    match.requestIds = [currentRequest._id, matchingRequest._id];
                    // Meetup location is average of the two origins
                    var meetupLocation = matching.findMeetupLocation(currentRequest.originLat, currentRequest.originLng,
                        matchingRequest.originLat, matchingRequest.originLng);
                    match.meetupLat = meetupLocation[0];
                    match.meetupLng = meetupLocation[1];
                    new Match(match).save(function (error, match) {
                        if (!error) {
                            currentRequest.matchId = match._id;
                            matchingRequest.matchId = match._id;
                            currentRequest.save(function (error, data) {
                                if (!error) {
                                    matchingRequest.save(function (error, data) {
                                        http.genResponse(response, error, match, next);
                                    });
                                } else http.genResponse(response, error, match, next);
                            });
                        } else http.genResponse(response, error, match, next);
                    });
                } else http.genResponse(response, error, null, next);
            } else http.genResponse(response, error, null, next);
        }
    })
};

/**
 * Update a match
 * @param {Object} request HTTP match
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.update = function (request, response, next) {
    var error = http.checkRequestParams(request.params, ['_id']);
    if (error) {
        return next(error);
    }

    var id = request.params['_id'];
    Match.findByIdAndUpdate(id, request.body, function (error, data) {
        http.genResponse(response, error, request.body, next);
    });
};

/**
 * Remove a match
 * @param {Object} request HTTP match
 * @param {Object} response HTTP response
 * @param {function} next Callback
 */
exports.remove = function (request, response, next) {
    var error = http.checkRequestParams(request.params, ['_id']);
    if (error) {
        return next(error);
    }

    var id = request.params['_id'];
    Match.findByIdAndRemove(id, function (error) {
        if (!error) {
            Request.update({'matchId': id}, {'matchId': null}, {'multi': true}, function (error, data) {
                http.genResponse(response, error, id, next);
            });
        } else http.genResponse(response, error, id, next);
    });
};