const route = require('express').Router();
const { TeamController, TeamMemberController } = require('../controllers');
const authentication = require('../middlewares/teamAuthentication');

route.post('/register', TeamController.register);
route.post('/login', TeamController.login);
route.post('/member/:id', TeamMemberController.addMember);
route.get('/team', authentication, TeamController.getTeamInfo);
route.get('/team/:id', authentication, TeamController.findTeamById);
route.get('/klasemen', authentication, TeamController.getKlasemen); //dengan query params => /klasemen?EventId=1&status=team
route.get('/:id', authentication, TeamController.findTeamByEvent);

module.exports = route;