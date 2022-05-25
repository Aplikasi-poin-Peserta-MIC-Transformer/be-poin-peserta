const { Team } = require('../models')
const Crypto = require('../helpers/cryptojs')
const AccessToken = require('../helpers/accessToken')

class TeamController {
  static async register(req, res, next) {
    const teamData = {
      nama_team: req.body.nama_team,
      password: Crypto.encrypt(req.body.password, process.env.SECRET_KEY),
      EventId: req.body.EventId
    };
    try {
      const newTeam = await Team.create(teamData);
      const { id, nama_team, EventId } = newTeam;
      res.status(201).json({ id, nama_team, EventId });
    }
    catch(err) {
      next(err)
    };
  };

  static async login(req, res, next) {
    const teamData = {
      nama_team: req.body.nama_team,
      password: req.body.password,
    };
    try {
      const team = await Team.findOne({
        where: {
          nama_team: teamData.nama_team
        }
      });
      if (!team) {
        res.status(401).json({ message: 'Wrong Team Name or Password'});
      } else {
        const decrypted = Crypto.decrypt(team.password);
        if (decrypted !== teamData.password) {
          res.status(401).json({ message: 'Wrong Team Name or Password' });
        } else {
          const payload = {
            id: team.id,
            nama_team: team.nama_team,
            EventId: team.EventId
          };
          const accessToken = AccessToken.generate(payload);
          res.status(200).json({ id: team.id, nama_team: team.nama_team, accessToken});
        }
      }
    }
    catch(err) {
      next(err);
    }
  };
};

module.exports = TeamController;