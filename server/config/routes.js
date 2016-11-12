var express = require('express');

var main = require('../controllers/main'),
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

    app.put('/users/:_id', function(request, response, next) {
        users.update(request, response, next);
    });

    app.delete('/users/:_id', function (request, response, next) {
        users.remove(request, response, next);
    });

    // Requests

    app.get('/requests', function (request, response, next) {
        requests.all(request, response, next);
    });

    app.get('/requests/:userId', function (request, response, next) {
        requests.user(request, response, next);
    });

    app.post('/requests/:userId', function (request, response, next) {
        requests.add(request, response, next);
    });

    app.put('/requests/:userId/:_id', function(request, response, next) {
        requests.update(request, response, next);
    });

    app.delete('/requests/:userId/:_id', function (request, response, next) {
        requests.remove(request, response, next);
    })

};