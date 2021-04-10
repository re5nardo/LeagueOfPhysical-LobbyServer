'use strict';
var express = require('express');
var router = express.Router();
var util = require("util");

const UserInfo = require('../models/user_info');
const UserMatchState = require('../models/user_match_state');

const UserInfoResponse = require('../models/response/user_info_response');
const UserMatchStateResponse = require('../models/response/user_match_state_response');

const gameRoomKeyFormat = `gameRoom:%s`;
const waitingRoomKeyFormat = `waitingRoom:%s`;

router.get('/userInfo/:userId', function (req, res) {
    OnGetUserInfo(req, res);
});

router.get('/matchState/:userId', function (req, res) {
    OnGetUserMatchState(req, res);
});

async function OnGetUserInfo(req, res) {
    try {
        const filter = {
            userId: req.params.userId
        };

        const update = {
            userId: req.params.userId
        };

        const options = {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        };

        const userInfo = await UserInfo.findOneAndUpdate(filter, update, options);

        res.json(new UserInfoResponse(200, {
            userId: userInfo.userId,
        }));
    } catch (error) {
        console.error(error);
        res.json(new UserInfoResponse(999, null));
    }
}

async function OnGetUserMatchState(req, res) {
    try {
        const userMatchState = await getUserMatchState(req.params.userId);
        if (!userMatchState) {
            return res.json(new UserMatchStateResponse(999, null));
        }

        res.json(new UserMatchStateResponse(200, {
            state: userMatchState.state,
            stateValue: userMatchState.stateValue,
            matchmakingTicketId: userMatchState.matchmakingTicketId
        }));
    } catch (error) {
        console.error(error);
        res.json(new UserMatchStateResponse(999, null));
    }
}

async function getUserMatchState(userId) {
    try {
        const filter = {
            userId: userId
        };

        const update = {
            userId: userId,
        };

        const options = {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        };

        const userMatchState = await UserMatchState.findOneAndUpdate(filter, update, options);

        switch (userMatchState.state) {
            case 'inWaitingRoom':
                const waitingRoomKey = util.format(waitingRoomKeyFormat, userMatchState.stateValue);
                if (await global.redis.existsAsync(waitingRoomKey) !== 1) {
                    userMatchState.state = '';
                    userMatchState.stateValue = '';
                    userMatchState.matchmakingTicketId = '';
                    await userMatchState.save();
                }
                break;

            case 'inGameRoom':
                const gameRoomKey = util.format(gameRoomKeyFormat, userMatchState.stateValue);
                if (await global.redis.existsAsync(gameRoomKey) !== 1) {
                    userMatchState.state = '';
                    userMatchState.stateValue = '';
                    userMatchState.matchmakingTicketId = '';
                    await userMatchState.save();
                }
                break;
        }
        return userMatchState;
    } catch (error) {
        console.error(error);
    }
}

module.exports = router;
