var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    secrets = require('./server/config/secrets'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var port = process.env.PORT || 3000;

// Database
var connect = function () {
    mongoose.connect(secrets.db, function (err) {
        if (err) {
            console.log('Error connecting to: ' + secrets.db + '. ' + err);
        } else {
            console.log('Succeeded connected to: ' + secrets.db);
        }
    });
};

connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Models
require('./server/models/models');

// Routes
require('./server/config/routes')(app);
app.use('/', router);
app.listen(port, function (error) {
    if (error) {
        return console.log(error);
    }

    console.log("Express server listening on port " + port);
});

require('./server/config/errors')(app);

module.exports = app;
