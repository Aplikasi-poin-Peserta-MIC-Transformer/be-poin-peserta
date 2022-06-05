const { Gift } = require('../models')

class GiftController {

}

// // Get All Gifts
// router.get('/', (req, res) => {
//   Gift.find({})
//   .then(gift => {
//       res.json(gift);
//   })
//   .catch(err => {
//       res.status(404).json({isSuccess: false, result: err.json})
//   })
// });

// // Get Specific Gift
// router.get('/:id', (req, res) => {
//   Gift.findById(req.params.id)
//       .then(gift => res.json(gift))
//       .catch(err => res.status(404).json({isSuccess: false, result: err.json}))
// });

// // Create New Gift
// router.post('/', authenticate.verifyUser, (req, res) => {
//   const newGift = new Gift({
//       name: req.body.name,
//       description: req.body.description,
//       image_url: req.body.image_url,
//       quantity: req.body.quantity
//   });

//   newGift.save()
//       .then(gift => {
//           res.json(gift)
//       })
//       .catch(err => {
//           res.status(404).json(err)
//       });
// });

// // Delete Gift
// router.delete('/:id', authenticate, (req, res) => {
//   Gift.findById(req.params.id)
//       .then(gift => {
//           gift.remove()
//           .then(() => {
//               res.json({isSuccess: true})
//           })
//           .catch(() => {
//               res.json({isSuccess: false})
//           })
//       }).catch(() => {
//           res.status(404).json({isSuccess: false})
//       })
// });

// // Update Gift
// router.put('/:id', authenticate, (req, res) => {
//   Gift.updateOne(
//       { _id: req.params.id }, 
//       {
//           $set: {
//               name: req.body.name,
//               description: req.body.description,
//               image_url: req.body.image_url,
//               quantity: req.body.quantity
//           }
//       })
//       .then(() => {
//           Gift.findById(req.params.id)
//           .then(gift => res.json(gift))
//           .catch(err => {
//               res.status(404).json({isSuccess: false, result: err.json})
//           })
//       }).catch(err => {
//           res.status(404).json({isSuccess: false, result: err})
//       });
// });

// // Redeem Gift
// router.put('/:id/redeem', authenticate, quantityChecker, (req, res) => {
//   Gift.updateOne(
//       { _id: req.params.id }, 
//       {
//           $inc: {
//               quantity: -1
//           }
//       })
//   .then(() => {
//       Gift.findById(req.params.id)
//       .then(gift => res.json(gift))
//       .catch(err => {
//           res.status(404).json({isSuccess: false, result: err.json})
//       })
//   }).catch(err => {
//       res.status(404).json({isSuccess: false, result: err})
//   });
// });


module.exports = GiftController;