const route = require('express').Router();
const teamRoute = require('./teams');
const userRoute = require('./users');
const eventRoute = require('./events');
const giftRoute = require('./gifts');

route.use('/api/v1/teams', teamRoute);
route.use('/api/v1/users', userRoute);
route.use('/api/v1/events', eventRoute);
route.use('/api/v1/gifts', giftRoute);

module.exports = route;