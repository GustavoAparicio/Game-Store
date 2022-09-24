const express = require('express');

// Controllers
const {
	getAllGames,
	createGame,
	updateGame,
	deleteGame,	
	createReview
} = require('../controllers/games.controller');

// Middlewares
const { gameExists } = require('../middlewares/games.middleware');

const {
	protectSession,
} = require('../middlewares/auth.middleware');

const gamesRouter = express.Router();

gamesRouter.get('/', getAllGames);

gamesRouter.use(protectSession);
gamesRouter.post('/',  createGame);
gamesRouter
	.use('/:id', gameExists)
	.route('/:id')	
	.patch(updateGame)
	.delete(deleteGame);

gamesRouter.post('/:gameId/reviews', createReview);

module.exports = { gamesRouter };
