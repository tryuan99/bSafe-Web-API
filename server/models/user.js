var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    /**
     * @property (String) firstName
     */
    firstName: {type: String, required: true},
    /**
     * @property {String} lastName
     */
    lastName: {type: String, required: true},
    /**
     * @property {String} email
     */
    email: {type: String, required: true, unique: true, lowercase: true},
    /**
     * @property {String} password
     */
    password: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);