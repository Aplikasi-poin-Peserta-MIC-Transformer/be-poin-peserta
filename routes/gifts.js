const route = require('express').Router();
const { GiftController } = require('../controllers');
const authentication = require('../middlewares/userAuthentication');

route.post('/add', GiftController.add);
route.get('/', GiftController.findAll);
route.get('/:id', GiftController.findById);
route.put('/:id', GiftController.update);
route.post('/redeem/:id', authentication, GiftController.redeem);
route.delete('/:id', GiftController.delete);

module.exports = route;