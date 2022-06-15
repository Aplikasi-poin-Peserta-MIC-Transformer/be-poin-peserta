const route = require('express').Router();
const { PointController } = require('../controllers');
const authentication = require('../middlewares/teamAuthentication');

route.post('/', PointController.add);

module.exports = route;