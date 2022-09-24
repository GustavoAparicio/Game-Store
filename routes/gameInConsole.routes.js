const express = require('express');

// Controllers
const {
    gameInConsole
} = require('../controllers/gameInConsole.controller');

const gameInConsoleRouter = express.Router();

gameInConsoleRouter.post('/', gameInConsole);

module.exports = { gameInConsoleRouter };
