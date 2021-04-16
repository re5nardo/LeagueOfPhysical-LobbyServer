'use strict';
const ResponseBase = require('./response_base')

module.exports = class JoinLobbyResponse extends ResponseBase {
    constructor(code) {
        super(code);
    }
}
