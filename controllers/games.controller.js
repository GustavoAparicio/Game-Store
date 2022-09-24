const jwt = require('jsonwebtoken');

// Models
const { Review } = require('../models/review.model');
const { Console } = require('../models/console.model');
const { Game } = require('../models/game.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const getAllGames = catchAsync(async (req, res, next) => {
	const games = await Game.findAll({
		include:[
			{model:Console},			
			{model:Review}
			],
		 
		});

	res.status(200).json({
		status: 'success',
		games,
	});
});

const createGame = catchAsync(async (req, res, next) => {
	const { title, gender } = req.body;

	const newGame = await Game.create({
		title,
		gender,
	});

	res.status(201).json({
		status: 'success',
		newGame,
	});
});

const updateGame = catchAsync(async (req, res, next) => {
	const { game } = req;
	const { title } = req.body;

	await game.update({ title });

	res.status(204).json({ status: 'success' });
});

const deleteGame = catchAsync(async (req, res, next) => {
	const { game } = req;

	await game.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

const createReview = catchAsync(async (req, res, next) => {

	const { gameId } = req.params
	const { comment } = req.body;
	const token = req.headers.authorization.split(' ')[1]
	const decoded = await jwt.verify(token, process.env.JWT_SECRET);

	const newReview = await Review.create({
		userId: decoded.id,
		gameId,
		comment,
	});

	res.status(204).json({
		status: 'success',
		newReview,
	});
});


module.exports = {
	getAllGames,
	createGame,
	updateGame,
	deleteGame,
	createReview
};