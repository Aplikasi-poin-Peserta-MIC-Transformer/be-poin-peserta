const route = require('express').Router();
const { UserController } = require('../controllers');
const authentication = require('../middlewares/userAuthentication');
const authorization = require('../middlewares/userAuthorization');
const adminAuthorization = require('../middlewares/adminAuthorization');

route.post('/register', UserController.register);
route.post('/registeradmin', UserController.registerAdmin);
route.post('/login', UserController.login);
route.get('/user', authentication, authorization, UserController.findUser);
route.get('/:id', authentication, adminAuthorization, UserController.findById);

module.exports = route;