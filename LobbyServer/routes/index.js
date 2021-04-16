'use strict';
const express = require('express');
const router = express.Router();
const request = require('request-promise-native');

const JoinLobbyResponse = require('../models/response/join_lobby_response');
const LeaveLobbyResponse = require('../models/response/leave_lobby_response');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.put('/joinLobby', function (req, res) {
    res.json(new JoinLobbyResponse(200));
});

router.put('/leaveLobby', function (req, res) {
    onLeaveLobby(req, res);
});

async function onLeaveLobby(req, res) {
    try {
        const options = {
            uri: `http://127.0.0.1:1555/match/matchmakingTicket/${req.body.userId}`,
            method: 'DELETE',
        }
        await request(options);
    } catch (error) {
        console.error(error);
    }

    res.json(new LeaveLobbyResponse(200));
}

module.exports = router;
