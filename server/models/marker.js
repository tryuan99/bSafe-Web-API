var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MarkerSchema = new Schema({
    /**
     * @property {String} description
     */
    description: {type: String, required: true},
    /**
     * @property {Date} date
     */
    date: {type: Date},
    /**
     * @property {Number} latitude
     */
    latitude: {type: Number, required: true},
    /**
     * @property {Number} longitude
     */
    longitude: {type: Number, required: true}
});

module.exports = mongoose.model('Marker', MarkerSchema);