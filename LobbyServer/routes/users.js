'use strict';
var express = require('express');
var router = express.Router();
var util = require("util");

const UserMatchStateResponse = require('../models/response/user_match_state_response');

const userMatchStateKeyFormat = `user.matchState:%s`;
const gameRoomKeyFormat = `gameRoom:%s`;
const waitingRoomKeyFormat = `waitingRoom:%s`;

const userMatchStateLockKeyFormat = `lock.user.matchState:%s`;

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.get('/matchState/:userId', function (req, res) {
    OnGetUserMatchState(req, res);
});

async function OnGetUserMatchState(req, res) {
    const userMatchState = await getUserMatchState(req.params.userId);
    if (userMatchState) {
        res.json(new UserMatchStateResponse(200, userMatchState));
    } else {
        res.json(new UserMatchStateResponse(999, userMatchState));
    }
}

async function getUserMatchState(userId) {
    let userMatchStateLock;
    const ttl = 3000;
    try {
        userMatchStateLock = await global.redis.redlock.lock(util.format(userMatchStateLockKeyFormat, userId), ttl);

        let userMatchState;
        const userMatchStateJson = await global.redis.getAsync(util.format(userMatchStateKeyFormat, userId));
        if (userMatchStateJson === null) {
            userMatchState = {
                state: '',
                stateValue: '',
                matchmakingTicketId: ''
            }
        } else {
            userMatchState = JSON.parse(userMatchStateJson);
        }

        switch (userMatchState.state) {
            case 'inWaitingRoom':
                const waitingRoomKey = util.format(waitingRoomKeyFormat, userMatchState.stateValue);
                if (await global.redis.existsAsync(waitingRoomKey) !== 1) {
                    userMatchState.state = '';
                    userMatchState.stateValue = '';
                    userMatchState.matchmakingTicketId = '';
                    await global.redis.setAsync(util.format(userMatchStateKeyFormat, userId), JSON.stringify(userMatchState));
                }
                break;

            case 'inGameRoom':
                const gameRoomKey = util.format(gameRoomKeyFormat, userMatchState.stateValue);
                if (await global.redis.existsAsync(gameRoomKey) !== 1) {
                    userMatchState.state = '';
                    userMatchState.stateValue = '';
                    userMatchState.matchmakingTicketId = '';
                    await global.redis.setAsync(util.format(userMatchStateKeyFormat, userId), JSON.stringify(userMatchState));
                }
                break;
        }
        return userMatchState;
    } catch (error) {
        console.error(error);
    } finally {
        await userMatchStateLock.unlock();
    }
}

module.exports = router;
