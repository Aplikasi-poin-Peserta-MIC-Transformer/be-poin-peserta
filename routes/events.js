const route = require('express').Router();
const { EventController } = require('../controllers');

route.post('/add', EventController.add);
route.get('/', EventController.findAll);
route.put('/:id', EventController.update);
route.delete('/:id', EventController.delete);

module.exports = route;