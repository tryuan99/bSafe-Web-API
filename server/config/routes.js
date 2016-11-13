var express = require('express');

var main = require('../controllers/main'),
    markers = require('../controllers/markers'),
    matches = require('../controllers/matches'),
    requests = require('../controllers/requests'),
    users = require('../controllers/users');

module.exports = function (app) {

    // Main

    app.get('/', function (request, response, next) {
        main.default(request, response, next);
    });

    // Users

    app.get('/users', function (request, response, next) {
        users.all(request, response, next);
    });

    app.get('/users/:_id', function (request, response, next) {
        users.one(request, response, next);
    });

    app.post('/users', function (request, response, next) {
        users.add(request, response, next);
    });

    app.put('/users/:_id', function (request, response, next) {
        users.update(request, response, next);
    });

    app.delete('/users/:_id', function (request, response, next) {
        users.remove(request, response, next);
    });

    app.post('/users/login', function (request, response, next) {
        users.login(request, response, next);
    });

    // Requests

    app.get('/requests', function (request, response, next) {
        requests.all(request, response, next);
    });

    app.get('/requests/:_id', function (request, response, next) {
        requests.one(request, response, next);
    });

    app.get('/requests/user/:userId', function (request, response, next) {
        requests.user(request, response, next);
    });

    app.post('/requests', function (request, response, next) {
        requests.add(request, response, next);
    });

    app.put('/requests/:_id', function (request, response, next) {
        requests.update(request, response, next);
    });

    app.delete('/requests/:_id', function (request, response, next) {
        requests.remove(request, response, next);
    });

    // Matches

    app.get('/matches', function (request, response, next) {
        matches.all(request, response, next);
    });

    app.get('/matches/:_id', function (request, response, next) {
        matches.one(request, response, next);
    });

    app.get('/matches/request/:requestId', function (request, response, next) {
        matches.request(request, response, next);
    });

    app.post('/matches', function (request, response, next) {
        matches.add(request, response, next);
    });

    app.put('/matches/:_id', function (request, response, next) {
        matches.update(request, response, next);
    });

    app.delete('/matches/:_id', function (request, response, next) {
        matches.remove(request, response, next);
    });

    // Markers

    app.get('/markers', function (request, response, next) {
        markers.all(request, response, next);
    });

    app.get('/markers/:_id', function (request, response, next) {
        markers.one(request, response, next);
    });

    app.post('/markers', function (request, response, next) {
        markers.add(request, response, next);
    });

    app.get('/markers/update', function (request, response, next) {
        markers.fetch(request, response, next);
    });

};