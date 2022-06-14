const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const { Team, Event } = require('../models')
const Crypto = require('../helpers/cryptojs')
const AccessToken = require('../helpers/accessToken')
let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

class TeamController {
  static async register(req, res, next) {
    const teamData = {
      username: req.body.username.toLowerCase().replace(/\s+/g, ''),
      nama_tim: req.body.nama_tim,
      password: Crypto.encrypt(req.body.password, process.env.SECRET_KEY),
      EventId: req.body.EventId
    };
    try {
      const team = await Team.findOne({ where: { username: teamData.username } });
      if (!Boolean(team)) {
        const newTeam = await Team.create(teamData);
        const { id, username, nama_tim, EventId } = newTeam;
        res.status(201).json({ id, username, nama_tim, EventId });
      } else {
        res.status(400).json({ message: 'Team already exist' });
      }
    }
    catch (err) {
      next(err)
    };
  };

  static async login(req, res, next) {
    const teamData = {
      username: req.body.username.toLowerCase().replace(/\s+/g, ''),
      password: req.body.password,
    };
    try {
      const team = await Team.findOne({
        where: {
          username: teamData.username
        }
      });
      if (!team) {
        res.status(401).json({ message: 'Wrong Team Name or Password' });
      } else {
        const decrypted = Crypto.decrypt(team.password);
        if (decrypted !== teamData.password) {
          res.status(401).json({ message: 'Wrong Team Name or Password' });
        } else {
          const payload = {
            id: team.id,
            username: team.username,
            nama_tim: team.nama_tim,
            EventId: team.EventId
          };
          const accessToken = AccessToken.generate(payload);
          res.status(200).json({ id: team.id, username: team.username, nama_tim: team.nama_tim, accessToken });
        }
      }
    }
    catch (err) {
      next(err);
    }
  };

  static async getTeamInfo(req, res, next) {
    const id = req.team.id
    try {
      const team = await Team.findOne({
        where: { id }, include: Event
      });
      team['nama_event'] = team.Event.nama_event
      res.status(200).json(team);
    }
    catch (err) {
      next(err);
    }
  }

  static async findAllTeam(req, res, next) {
    try {
      const teams = await Team.findAll({include: Event});
      let teamData = []
      teams.map(team => {
        teamData.push({
          nama_tim: team.nama_tim,
          username: team.username,
          barcode: team.barcode,
          EventId: team.EventId, 
          nama_event: team.Event.nama_event})
      })
      res.status(200).json(teamData);
    }
    catch (err) {
      next(err);
    }
  }

  static async findTeamByEvent(req, res, next) {
    const EventId = req.params.id
    try {
      const teams = await Team.findAll({
        where: { EventId }, include: Event
      });
      let teamData = []
      teams.map(team => {
        teamData.push({
          nama_tim: team.nama_tim,
          username: team.username,
          barcode: team.barcode,
          EventId: team.EventId, 
          nama_event: team.Event.nama_event})
      })
      res.status(200).json(teamData);
    }
    catch (err) {
      next(err);
    }
  }

  static async findTeamById(req, res, next) {
    const id = req.params.id
    try {
      const team = await Team.findOne({
        where: { id }, include: Event
      });
      team['nama_event']
      res.status(200).json(team);
    }
    catch (err) {
      next(err);
    }
  }

  static async getKlasemen(req, res, next) {
    const EventId = req.query.EventId
    const status = req.query.status
    try {
      // join table points dan Teams berdasarkan id dan jumlah point tertinggi
      const eventName = await sequelize.query(`SELECT nama_event FROM Events WHERE id = ${EventId}`, { type: Sequelize.QueryTypes.SELECT })
      const [results, metadata] = await sequelize.query(`
        SELECT b.nama_tim, a.total_poin, c.nama_event, a.status
        FROM Points AS a
        INNER JOIN 
        Teams AS b ON a.TeamId_or_UserId = b.id
        INNER JOIN
        Events AS c ON a.EventId = c.id
        WHERE a.status = "${status}" AND c.id = "${EventId}"
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

module.exports = TeamController;