const route = require('express').Router();
const { UserController } = require('../controllers');
const userAuthentication = require('../middlewares/userAuthentication');
const userAuthorization = require('../middlewares/userAuthorization');

route.post('/register', UserController.register);
route.post('/login', UserController.login);
route.get('/user', userAuthentication, userAuthorization, UserController.findUser);

module.exports = route;