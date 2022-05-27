const route = require('express').Router();
const { TeamController } = require('../controllers');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

route.post('/register', TeamController.register);
route.post('/login', TeamController.login);
route.get('/team', authentication, authorization, TeamController.findTeam);

module.exports = route;