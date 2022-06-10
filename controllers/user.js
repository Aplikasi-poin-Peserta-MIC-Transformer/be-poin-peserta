const { User } = require('../models')
const Crypto = require('../helpers/cryptojs')
const AccessToken = require('../helpers/accessToken')

class UserController {
  static async register(req, res, next) {
    const userData = {
      nama: req.body.nama,
      password: Crypto.encrypt(req.body.password, process.env.SECRET_KEY),
      no_wa: req.body.no_wa,
      perusahaan: req.body.perusahaan,
      EventId: req.body.EventId
    };
    try {
      const newUser = await User.create(userData);
      const { id, nama, EventId } = newUser;
      res.status(201).json({ id, nama, EventId });
    }
    catch(err) {
      console.log(err)
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
          nmr_wa: userData.no_wa
        }
      });
      if (!user) {
        res.status(401).json({ message: 'Wrong Whatsapp Number or Password'});
      } else {
        const decrypted = Crypto.decrypt(user.password);
        if (decrypted !== userData.password) {
          res.status(401).json({ message: 'Wrong Whatsapp Number or Password' });
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

  static async findUserById(req, res, next) {
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