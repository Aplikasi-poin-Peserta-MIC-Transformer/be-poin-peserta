const { Admin} = require('../models')
const Crypto = require('../helpers/cryptojs')
const AccessToken = require('../helpers/accessToken')

class AdminController {
  static async register(req, res, next) {
    const adminData = {
      username: req.body.username,
      password: Crypto.encrypt(req.body.password, process.env.SECRET_KEY),
    };
    try {
      const newAdmin = await Admin.create(adminData);
      const { id, username } = newAdmin;
      res.status(201).json({ id, username });
    }
    catch(err) {
      console.log(err)
    };
  };

  static async login(req, res, next) {
    const adminData = {
      username: req.body.username,
      password: req.body.password,
    };
    try {
      const admin = await Admin.findOne({
        where: {
          username: adminData.username
        }
      });
      if (!admin) {
        res.status(401).json({ message: 'Wrong Username or Password'});
      } else {
        const decrypted = Crypto.decrypt(admin.password);
        if (decrypted !== adminData.password) {
          res.status(401).json({ message: 'Wrong Username or Password' });
        } else {
          const payload = {
            id: admin.id,
            username: admin.username,
            isAdmin: true
          };
          const accessToken = AccessToken.generate(payload);
          res.status(200).json({ id: admin.id, username: admin.username, accessToken});
        }
      }
    }
    catch(err) {
      next(err);
    }
  };

  static async findAll(req, res, next) {
    try {
      const admins = await Admin.findAll({
        order: [['id', 'asc']]
      });
      res.status(200).json(admins);
    } catch (err) {
      next(err)
    };
  }

  static async findAdmin(req, res, next) {
    const id = req.params.id
    try {
      const admin = await Admin.findOne({
        where: { id }
      });
      res.status(200).json(admin);
    }
    catch(err) {
      next(err);
    }
  }
};

module.exports = AdminController;