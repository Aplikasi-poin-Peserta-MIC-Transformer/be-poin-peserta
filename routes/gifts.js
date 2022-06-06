const route = require('express').Router();
const { GiftController } = require('../controllers');

route.post('/add', GiftController.add);
route.get('/', GiftController.findAll);
route.get('/:id', GiftController.findById);
route.put('/:id', GiftController.update);
route.put('/redeem/:id', GiftController.redeem);
route.delete('/:id', GiftController.delete);

module.exports = route;