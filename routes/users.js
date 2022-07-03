const route = require('express').Router();
const { UserController } = require('../controllers');
const authentication = require('../middlewares/userAuthentication');

route.post('/register', UserController.register);
route.post('/registeradmin', UserController.registerAdmin);
route.post('/login', UserController.login);
route.get('/user', authentication, UserController.getUserInfo);
route.get('/user/:id', UserController.findUserById);
route.get('/klasemen', UserController.getKlasemen); //dengan query params => /klasemen?EventId=1&status=user
route.put('password/:id', UserController.updatePassword);
route.get('/', UserController.findAllUser);
route.get('/:id', UserController.findUserByEvent);
route.put('/:id', UserController.update);

module.exports = route;