const { User_Gift } = require('../models')

class UserGiftController {
  static async findGiftByUser(req, res, next) {
    const UserId = req.params.id
    try {
      const gifts = await User_Gift.findAll({
        where: { UserId }
      });
      if (!gifts) {
        res.status(401).json({ message: 'No User Gift yet' });
      } else {
        res.status(200).json(gifts);
      }
    } 
    catch (err) {
      next(err)
    }
  }
}

module.exports = UserGiftController