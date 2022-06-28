const route = require('express').Router();
const { UserController } = require('../controllers');
const authentication = require('../middlewares/userAuthentication');

route.post('/register', UserController.register);
route.post('/registeradmin', UserController.registerAdmin);
route.post('/login', UserController.login);
route.get('/user/:id', UserController.findUserById);
route.get('/klasemen', UserController.getKlasemen); //dengan query params => /klasemen?EventId=1&status=user
route.get('/user', authentication, UserController.getUserInfo);
route.get('/', UserController.findAllUser);
route.get('/:id', UserController.findUserByEvent);

module.exports = route;