const route = require('express').Router();
const { TeamController } = require('../controllers');
const authentication = require('../middlewares/authentication');

route.post('/register', TeamController.register);
route.post('/login', TeamController.login);

module.exports = route;