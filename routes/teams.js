const route = require('express').Router();
const { TeamController } = require('../controllers');
const authentication = require('../middlewares/teamAuthentication');
const authorization = require('../middlewares/teamAuthorization');

route.post('/register', TeamController.register);
route.post('/login', TeamController.login);
route.get('/team', authentication, authorization, TeamController.findTeam);
route.get('/:id', authentication, authorization, TeamController.findTeamById);

module.exports = route;