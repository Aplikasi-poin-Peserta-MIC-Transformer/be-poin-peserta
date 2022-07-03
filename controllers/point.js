const { Point, Pos_step, Log_point } = require('../models');

class PointController {
  static async add(req, res, next) {
    try {
      const pointData = {
        total_poin: parseInt(req.body.total_poin),
        status: req.body.status,
        TeamId_or_UserId: parseInt(req.body.TeamId_or_UserId),
        EventId: parseInt(req.body.eventId),
        pos: parseInt(req.body.pos)
      }
      const pointStep = {
        pos: parseInt(req.body.pos),
        status: req.body.status,
        TeamId_or_UserId: parseInt(req.body.TeamId_or_UserId),
        EventId: parseInt(req.body.eventId)
      }
      const poinByUser = await Point.findOne({ where: { TeamId_or_UserId: pointData.TeamId_or_UserId, status: pointData.status, EventId: pointData.EventId } })
      if (!Boolean(poinByUser)) {
        const posStep = await Pos_step.create(pointStep);
        const newPoint = await Point.create(pointData);
        const { pos } = posStep;
        const { TeamId_or_UserId, status, total_poin } = newPoint;
        res.status(201).json({ TeamId_or_UserId, status, total_poin, pos });
      } else {
        await Pos_step.update({ pos: pointData.pos }, { where: { TeamId_or_UserId: pointData.TeamId_or_UserId, status: pointData.status, EventId: pointData.EventId } })
        await Point.update({ total_poin: (parseInt(poinByUser.total_poin) + parseInt(pointData.total_poin)) }, { where: { TeamId_or_UserId: pointData.TeamId_or_UserId, status: pointData.status, EventId: pointData.EventId } })
        res.status(201).json({ message: 'Point has been updated'});
      }
    }
    catch (err) {
      next(err)
    };
  }

  static async addUserPoint(req, res, next) {
    try {
      const pointData = {
        total_poin: parseInt(req.body.total_poin),
        status: req.body.status,
        TeamId_or_UserId: parseInt(req.body.TeamId_or_UserId),
        EventId: parseInt(req.body.eventId),
      }
      const logData = {
        UserId: pointData.TeamId_or_UserId,
        poin: pointData.total_poin,
        status: 'getPoint'
      }
      const poinByUser = await Point.findOne({ where: { TeamId_or_UserId: pointData.TeamId_or_UserId, status: pointData.status, EventId: pointData.EventId } })
      if (!Boolean(poinByUser)) {
        const newPoint = await Point.create(pointData);
        await Log_point.create(logData);
        const { TeamId_or_UserId, status, total_poin } = newPoint;
        res.status(201).json({ TeamId_or_UserId, status, total_poin, logStatus: logData.status });
      } else {
        await Point.update({ total_poin: (parseInt(poinByUser.total_poin) + parseInt(pointData.total_poin)) }, { where: { TeamId_or_UserId: pointData.TeamId_or_UserId, status: pointData.status, EventId: pointData.EventId } })
        await Log_point.create(logData);
        res.status(201).json({ message: 'Point has been updated'});
      }
    }
    catch (err) {
      next(err)
    };
  }
}

module.exports = PointController