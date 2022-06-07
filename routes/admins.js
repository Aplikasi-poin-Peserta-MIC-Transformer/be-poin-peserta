const route = require('express').Router();
const { AdminController } = require('../controllers');
const authentication = require('../middlewares/userAuthentication');
const adminAuthorization = require('../middlewares/adminAuthorization');

route.post('/register', AdminController.register);
route.post('/login', AdminController.login);
route.get('/', authentication, adminAuthorization, AdminController.findAll);
route.get('/:id', authentication, adminAuthorization, AdminController.findAdmin);

module.exports = route;