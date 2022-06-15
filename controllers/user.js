const { User } = require('../models')
const AccessToken = require('../helpers/accessToken');
const { SECRET_KEY } = require('../config.json');

class UserController {
  static async register(req, res, next) {
    const userData = {
      nama: req.body.nama,
      password: req.body.password,
      no_wa: req.body.no_wa,
      barcode: `user/${req.body.no_wa}`,
      perusahaan: req.body.perusahaan,
      EventId: req.body.EventId
    };
    try {
      const user = await User.findOne({ where: { no_wa: userData.no_wa } });
      if (!Boolean(user)) {
        const newUser = await User.create(userData);
        const { id, nama, role, EventId } = newUser;
        const barcodeData = `${role}/${nama}/${id}`
        const barcode = `user/${userData.no_wa}`
        const barcoded = await User.update({barcode}, {
          where: { id },
          returning: true
        })
        res.status(201).json({ id, nama, EventId });
      } else {
        res.status(401).json({ message: 'User already exist' });
      }
    }
    catch(err) {
      next(err)
    };
  };

  static async registerAdmin(req, res, next) {
    const userData = {
      nama: req.body.nama,
      password: req.body.password,
      no_wa: req.body.no_wa,
      perusahaan: req.body.perusahaan,
      role: 'admin'
    };
    try {
      const user = await User.findOne({ where: { no_wa: userData.no_wa } });
      if (!Boolean(user)) {
        const newUser = await User.create(userData);
        const { id, nama, EventId } = newUser;
        res.status(201).json({ id, nama, EventId });
      } else {
        res.status(401).json({ message: 'User already exist' });
      }
    }
    catch(err) {
      next(err)
    };
  };

  static async login(req, res, next) {
    const userData = {
      no_wa: req.body.no_wa,
      password: req.body.password,
    };
    try {
      const user = await User.findOne({
        where: {
          no_wa: userData.no_wa
        }
      });
      if (!user) {
        res.status(401).json({ message: 'Wrong Whatsapp Number or Password'});
      } else {
          const payload = {
            id: user.id,
            nama: user.nama,
            role: user.role,
            EventId: user.EventId
          };
          const accessToken = AccessToken.generate(payload);
          res.status(200).json({ id: user.id, nama: user.nama, accessToken});    
      }
    }
    catch(err) {
      next(err);
    }
  };

  static async findUser(req, res, next) {
    const id = req.user.id
    try {
      const user = await User.findOne({
        where: { id }
      });
      res.status(200).json(user);
    }
    catch(err) {
      next(err);
    }
  }

  static async findById(req, res, next) {
    const id = req.params.id
    try {
      const user = await User.findOne({
        where: { id }
      });
      res.status(200).json(user);
    }
    catch(err) {
      next(err);
    }
  }
};

module.exports = UserController;