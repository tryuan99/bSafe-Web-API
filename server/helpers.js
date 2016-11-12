/**
 * Send an HTTP response with JSON formatted content and
 * specified HTTP status code.
 * @param {Object} response HTTP response
 * @param {number} status HTTP response status code
 * @param {Object} content Content to be formatted as JSON
 */
function sendResponse(response, status, content) {
    response.status(status).json(content);
}

/**
 * Generate an HTTP response with data (if successful) or error.
 * @param {Object} response HTTP response
 * @param {Object} err Error to be appended as response content
 * @param {Object} data Data to be appended as response content
 * @param {function} next Callback
 */
function genResponse(response, err, data, next) {
    if (err) {
        console.log(err);
        return next(err);
    }
    sendResponse(response, 200, data);
}

function checkRequestParams(params, keys) {
    for (var i = 0; i < keys.length; i++) {
        if (!params[keys[i]]) {
            var err = new Error('Bad Request');
            err.status = 400;
            return err
        }
    }
    return 0;
}

module.exports = {
    sendResponse: sendResponse,
    genResponse: genResponse,
    checkRequestParams: checkRequestParams
};