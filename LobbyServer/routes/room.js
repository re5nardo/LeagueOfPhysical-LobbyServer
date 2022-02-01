'use strict';
const express = require('express');
const router = express.Router();
const util = require("util");
const ResponseBase = require('../models/response/response_base');

const roomKeyFormat = `room:%s`;

router.get('/:roomId', function (req, res) {
    getRoom(req, res);
});

async function getRoom(req, res) {
    try {
        const room = await global.redis.getAsync(util.format(roomKeyFormat, req.params.roomId));
        res.send(room);
    } catch (error) {
        console.error(error);
        res.json(new ResponseBase(400));
    }
}

module.exports = router;
