const route = require('express').Router();
const teamRoute = require('./teams');
const userRoute = require('./users');

route.use('/api/v1/teams', teamRoute);
route.use('/api/v1/users', userRoute);

module.exports = route;