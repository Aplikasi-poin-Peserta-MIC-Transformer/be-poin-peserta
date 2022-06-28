const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const { User, Point, Event } = require('../models');
const AccessToken = require('../helpers/accessToken');
const { SECRET_KEY } = require('../config.json');
let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


class UserController {
  static async register(req, res, next) {
    const userData = {
      nama: req.body.nama,
      password: req.body.password,
      no_wa: req.body.no_wa.replace(/\s+/g, ''),
      perusahaan: req.body.perusahaan,
      EventId: req.body.EventId  
    };
    try {
      const user = await User.findOne({ where: { no_wa: userData.no_wa } });
      if (!Boolean(user)) {
        const newUser = await User.create(userData);
        const { id, nama, no_wa, EventId } = newUser;
        res.status(201).json({ id, nama, no_wa, EventId });
      } else {
        res.status(400).json({ message: 'User already exist' });
      }
    }
    catch (err) {
      next(err)
    };
  };

  static async registerAdmin(req, res, next) {
    const userData = {
      nama: req.body.nama,
      password: req.body.password,
      no_wa: req.body.no_wa.replace(/\s+/g, ''),
      perusahaan: req.body.perusahaan,
      EventId: req.body.EventId,
      role: 'admin'
    };
    try {
      const user = await User.findOne({ where: { no_wa: userData.no_wa } });
      if (!Boolean(user)) {
        const newUser = await User.create(userData);
        const { id, nama, no_wa, EventId } = newUser;
        res.status(201).json({ id, nama, no_wa, EventId });
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
      no_wa: req.body.no_wa.replace(/\s+/g, ''),
      password: req.body.password,
    };
    try {
      const user = await User.findOne({
        where: {
          no_wa: userData.no_wa
        }
      });
      if (!user) {
        res.status(401).json({ message: 'Wrong User Name or Password' });
      } else {
        // get gambar from Event where id = user.EventId
        const [event, metadata2] = await sequelize.query(`select gambar from Events where id = ${user.EventId}`)
          const payload = {
            id: user.id,
            nama: user.nama,
            no_wa: user.no_wa,
            EventId: user.EventId,
            gambar: event[0].gambar
          };
          const accessToken = AccessToken.generate(payload);
          res.status(200).json({ id: user.id, nama: user.nama, no_wa: user.no_wa, accessToken });      
      }
    }
    catch (err) {
      next(err);
    }
  };

  static async getUserInfo(req, res, next) {
    const id = req.user.id
    try {
      const user = await User.findOne({
        where: { id }
      });
      const [total_poin, metadata] = await sequelize.query(`select ifnull(total_poin,0) as point from Points where TeamId_or_UserId = ${id} limit 0,1`)
      res.status(200).json({ ...user.dataValues, total_poin: total_poin[0]?.point });
    }
    catch (err) {
      next(err);
    }
  }

  static async findAllUser(req, res, next) {
    try {
      const [results, metadata] = await sequelize.query(`
        SELECT * FROM (
        SELECT a.*, b.nama_event, IFNULL((SELECT total_poin FROM Points WHERE TeamId_or_UserId = a.id LIMIT 0,1),0) AS total_poin
        FROM Users AS a
        INNER JOIN
        Events AS b ON a.EventId = b.id
        ) AS v ORDER BY total_poin DESC
      `);
      res.status(200).json(results);
    }
    catch (err) {
      next(err);
    }
  }

  static async findUserByEvent(req, res, next) {
    const EventId = req.params.id
    try {
      const [results, metadata] = await sequelize.query(`
        SELECT * FROM (
        SELECT a.*, b.nama_event, IFNULL((SELECT total_poin FROM Points WHERE TeamId_or_UserId = a.id LIMIT 0,1),0) AS total_poin
        FROM Users AS a
        RIGHT JOIN
        Events AS b ON a.EventId = b.id where b.id = ${EventId}
        ) AS v ORDER BY id ASC
      `);
      res.status(200).json(results);
    }
    catch (err) {
      next(err);
    }
  }

  static async findUserById(req, res, next) {
    const id = req.params.id
    try {
      const user = await User.findOne({
        where: { id }
      });
      const event = await Event.findOne({ where: { id: user.EventId } })
      const points = await Point.findOne({ where: { TeamId_or_UserId: id }, attributes: ['total_poin'] })
      const point = points !== null ? points.total_poin : 0
      res.status(200).json({ ...user.dataValues, nama_event: event.nama_event, total_poin: point });
    }
    catch (err) {
      next(err);
    }
  }

  static async getKlasemen(req, res, next) {
    const EventId = req.query.EventId
    const status = req.query.status
    try {
      // join table points dan Users berdasarkan id dan jumlah point tertinggi
      const eventName = await sequelize.query(`SELECT nama_event FROM Events WHERE id = ${EventId}`, { type: Sequelize.QueryTypes.SELECT })
      const [results, metadata] = await sequelize.query(`
        SELECT * FROM (
        SELECT a.nama, b.nama_event, 
        IFNULL((SELECT total_poin FROM Points WHERE TeamId_or_UserId = a.id AND STATUS = "${status}" LIMIT 0, 1),0) AS total_poin,
        IFNULL((SELECT STATUS FROM Points WHERE TeamId_or_UserId = a.id LIMIT 0, 1),0) AS STATUS
        FROM Users AS a 
        INNER JOIN
        Events AS b ON a.EventId = b.id
        WHERE a.EventId = "${EventId}"
        ) AS v WHERE STATUS = "0" OR STATUS = "${status}" ORDER BY total_poin DESC
      `);
      const data = {
        nama_event: eventName[0]?.nama_event,
        klasemen: results
      }
      res.status(200).json(data);
    }
    catch (err) {
      next(err);
    }
  }
};

module.exports = UserController;