var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    /**
     * @property (String) username
     */
    username: {type: String, required: true},
});

module.exports = mongoose.model('User', UserSchema);