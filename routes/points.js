const route = require('express').Router();
const { PointController } = require('../controllers');
const authentication = require('../middlewares/teamAuthentication');

route.post('/', PointController.add);
route.post('/user', PointController.addUserPoint);

module.exports = route;