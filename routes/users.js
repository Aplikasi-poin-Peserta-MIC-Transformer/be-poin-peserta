const route = require('express').Router();
const { UserController } = require('../controllers');
const authentication = require('../middlewares/userAuthentication');

route.post('/register', UserController.register);
route.post('/registeradmin', UserController.registerAdmin);
route.post('/login', UserController.login);
route.get('/user', authentication, UserController.findUser);
route.get('/:id', authentication, UserController.findById);

module.exports = route;