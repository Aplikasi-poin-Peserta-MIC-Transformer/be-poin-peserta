const route = require('express').Router();
const { UserController } = require('../controllers');
const authentication = require('../middlewares/userAuthentication');
const authorization = require('../middlewares/userAuthorization');

route.post('/register', UserController.register);
route.post('/login', UserController.login);
route.get('/user', authentication, authorization, UserController.findUser);

module.exports = route;