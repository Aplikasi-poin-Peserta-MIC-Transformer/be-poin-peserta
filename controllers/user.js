const { User } = require('../models')
const Crypto = require('../helpers/cryptojs')
const AccessToken = require('../helpers/accessToken')

class UserController {
  static async register(req, res, next) {
    const userData = {
      nama: req.body.nama,
      password: Crypto.encrypt(req.body.password, process.env.SECRET_KEY),
      nmr_wa: req.body.nmr_wa,
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
      nmr_wa: req.body.nmr_wa,
      password: req.body.password,
    };
    try {
      const user = await User.findOne({
        where: {
          nmr_wa: userData.nmr_wa
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
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id
        }
      });
      res.status(200).json(user);
    }
    catch(err) {
      next(err);
    }
  }
};

module.exports = UserController;