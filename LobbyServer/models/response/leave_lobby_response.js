'use strict';
const ResponseBase = require('./response_base')

module.exports = class LeaveLobbyResponse extends ResponseBase {
    constructor(code) {
        super(code);
    }
}
