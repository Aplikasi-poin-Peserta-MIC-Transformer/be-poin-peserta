const route = require('express').Router();
const teamRoute = require('./teams');

route.use('/api/v1/teams', teamRoute);

module.exports = route;