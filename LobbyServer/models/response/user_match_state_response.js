'use strict';
const ResponseBase = require('./response_base')

module.exports = class UserMatchStateResponse extends ResponseBase {
    constructor(code, userMatchState) {
        super(code);
        this.userMatchState = userMatchState;
    }
}
