const { Point } = require('../models')

class PointController {
  static async add(req, res, next) {
    try {
      const pointData = {
          total_poin: req.body.total_poin,
          status: req.body.status,
          TeamId_or_UserId: req.body.TeamId_or_UserId,
          EventId: req.body.eventId,
      }
      const poinByUser = await Point.findOne({ where: { TeamId_or_UserId: pointData.TeamId_or_UserId, status: pointData.status, EventId: pointData.EventId } })
      if (!Boolean(poinByUser)) {
      const newPoint = await Point.create(pointData);
      const { TeamId_or_UserId, status, total_poin } = newPoint;
        res.status(201).json({ TeamId_or_UserId, status, total_poin });
      } else {
        await Point.update({ total_poin: (parseInt(poinByUser.total_poin) + parseInt(pointData.total_poin)) }, { where: { TeamId_or_UserId: pointData.TeamId_or_UserId, status: pointData.status, EventId: pointData.EventId } })
        res.status(201).json('Point has been updated');
      }
    }
    catch(err) {
      next(err)
    };
  }
}

module.exports = PointController