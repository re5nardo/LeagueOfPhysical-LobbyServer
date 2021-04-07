'use strict';
const ResponseBase = require('./response_base')

module.exports = class UserInfoResponse extends ResponseBase {
    constructor(code, userInfo) {
        super(code);
        this.userInfo = userInfo;
    }
}
