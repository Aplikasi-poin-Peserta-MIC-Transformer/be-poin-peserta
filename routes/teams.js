const route = require('express').Router();
const { TeamController } = require('../controllers');
const authentication = require('../middlewares/teamAuthentication');

route.post('/register', TeamController.register);
route.post('/login', TeamController.login);
route.get('/team', authentication, TeamController.findTeam);
route.get('/:id', authentication, TeamController.findTeamById);

module.exports = route;