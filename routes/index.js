const route = require('express').Router();
const teamRoute = require('./teams');
const userRoute = require('./users');
const eventRoute = require('./events');

route.use('/api/v1/teams', teamRoute);
route.use('/api/v1/users', userRoute);
route.use('/api/v1/events', eventRoute);

module.exports = route;