const route = require('express').Router();
const { EventController } = require('../controllers');
const authentication = require('../middlewares/userAuthentication');
const adminAuthorization = require('../middlewares/adminAuthorization');

route.get('/', EventController.findAll);
route.get('/:id', EventController.findById);
route.post('/add', EventController.add);
route.put('/:id', authentication, adminAuthorization, EventController.update);
route.delete('/:id', authentication, adminAuthorization, EventController.delete);

module.exports = route;