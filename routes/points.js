const route = require('express').Router();
const { PointController } = require('../controllers');
const authentication = require('../middlewares/teamAuthentication');

route.post('/', authentication, PointController.add);

module.exports = route;