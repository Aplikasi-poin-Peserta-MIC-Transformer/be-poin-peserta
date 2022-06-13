const route = require('express').Router();
const teamRoute = require('./teams');
const userRoute = require('./users');
const eventRoute = require('./events');
const giftRoute = require('./gifts');
const pointRoute = require('./points');

route.use('/api/v1/teams', teamRoute);
route.use('/api/v1/users', userRoute);
route.use('/api/v1/events', eventRoute);
route.use('/api/v1/gifts', giftRoute);
route.use('/api/v1/points', pointRoute);

module.exports = route;