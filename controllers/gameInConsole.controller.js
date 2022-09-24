const { GameInConsole } = require('../models/gameInConsole.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const gameInConsole = catchAsync(async (req, res, next) => {
	const { gameId, consoleId } = req.body;
	const newGameInConsole = await GameInConsole.create({
		gameId,
		consoleId,
	});

	res.status(201).json({
		status: 'success',
		newGameInConsole,
	});
	
});

module.exports = {
	gameInConsole
};