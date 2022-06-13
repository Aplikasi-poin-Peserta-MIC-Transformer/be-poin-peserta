const { Gift, User } = require('../models');

class GiftController {
  static async add(req, res, next) {
    try {
      const giftData = {
        nama: req.body.nama,
        gambar: req.body.gambar,
        harga: req.body.harga,
        stok: req.body.stok
      };
      const newGift = await Gift.create(giftData);
      const { id, nama } = newGift;
      res.status(201).json({ id, nama });
    }
    catch(err) {
      next(err)
    };
  }

  static async findAll(req, res, next) {
    try {
      const gifts = await Gift.findAll({
        order: [['id', 'asc']]
      });
      res.status(200).json(gifts);
    } catch (err) {
      next(err)
    };
  }

  static async findById (req, res, next) {
    const id = req.params.id
    try {
      const gift = await Gift.findOne({
        where: { id }
      })
      if (gift) {
        res.status(200).json(gift)
      } else {
        next({ message: 'Gift Not Found' })
      }
    } catch (err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    const id = req.params.id
    try {
      const giftData = {
        nama: req.body.nama,
        gambar: req.body.gambar,
        harga: req.body.harga,
        stok: req.body.stok
      }
      const gift = await Gift.update(giftData, {
        where: { id },
        returning: true
      })
      if (gift) {
        res.status(200).json('gift is updated')
      }
  }
    catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    const id = req.params.id;
    try {
      const gift = await Gift.destroy({
        where: { id }
      })
      res.status(200).json({ message: `Gift is Deleted` })
    } catch (err) {
        next(err)
    };
  }

  static async redeem(req, res, next) {
    const id = req.params.id
    const userId = req.user.id
    try {
      const gift = await Gift.findOne({
        where: { id }
      })
      const giftData = {
        stok: +gift.stok - 1
      };
      const price = +gift.price
      const userData = {
        poin: +req.user.poin - price
      };
      const updatedGift = await Gift.update(giftData, {
        where: { id },
        returning: true
      })
      const updatedUser = await User.update(userData, {
        where: { id: userId },
        returning: true
      })
      res.status(200).json('gift is redeemed')
  }
    catch (err) {
      next(err)
    }
  }
}

module.exports = GiftController;