const route = require('express').Router();
const { LogPointController } = require('../controllers');
const authentication = require('../middlewares/teamAuthentication');

route.get('/:id', LogPointController.findLogByUser);

module.exports = route;