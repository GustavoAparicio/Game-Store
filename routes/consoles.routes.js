const express = require('express');

// Controllers
const {
	getAllConsoles,
	createConsole,
	updateConsole,
	deleteConsole,	
} = require('../controllers/consoles.controller');

// Middlewares
const { consoleExists } = require('../middlewares/consoles.middleware');
const {
	protectSession,
} = require('../middlewares/auth.middleware');

const consolesRouter = express.Router();

consolesRouter.get('/', getAllConsoles);
consolesRouter.post('/',protectSession, createConsole);
consolesRouter.patch('/:id', protectSession, consoleExists, updateConsole);
consolesRouter.delete('/:id', protectSession, consoleExists, deleteConsole);

module.exports = { consolesRouter };
