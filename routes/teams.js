const route = require('express').Router();
const { TeamController } = require('../controllers');

route.post('/register', TeamController.register);
route.post('/login', TeamController.login);

module.exports = route;