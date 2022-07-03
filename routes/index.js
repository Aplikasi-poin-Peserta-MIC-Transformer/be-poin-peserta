const route = require('express').Router();
const teamRoute = require('./teams');
const userRoute = require('./users');
const eventRoute = require('./events');
const giftRoute = require('./gifts');
const pointRoute = require('./points');
const logPointRoute = require('./log_points');
const userGiftRoute = require('./user_gifts');

route.use('/api/v1/teams', teamRoute);
route.use('/api/v1/users', userRoute);
route.use('/api/v1/events', eventRoute);
route.use('/api/v1/gifts', giftRoute);
route.use('/api/v1/points', pointRoute);
route.use('/api/v1/logpoints', logPointRoute);
route.use('/api/v1/usergifts', userGiftRoute);

module.exports = route;