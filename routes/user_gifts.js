const route = require('express').Router();
const { UserGiftController } = require('../controllers');
const authentication = require('../middlewares/teamAuthentication');

route.get('/:id', UserGiftController.findGiftByUser);

module.exports = route;