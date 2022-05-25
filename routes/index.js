const route = require('express').Router();
const teamRoute = require('./teams');
const authentication = require('../middlewares/authentication');

route.use('/api/v1/teams', authentication, teamRoute);

module.exports = route;