'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userInfoSchema = new Schema({
    userId: String
});

module.exports = mongoose.model('UserInfo', userInfoSchema);
