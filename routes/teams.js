const route = require('express').Router();
const { TeamController } = require('../controllers');
const authentication = require('../middlewares/teamAuthentication');

route.post('/register', TeamController.register);
route.post('/login', TeamController.login);
route.get('/klasemen', TeamController.getKlasemen); //dengan query params => /klasemen?EventId=1&status=team
route.get('/team', authentication, TeamController.getTeamInfo);
route.get('/team/:id', authentication, TeamController.findTeamById);
route.get('/:id', authentication, TeamController.findTeamByEvent);

module.exports = route;