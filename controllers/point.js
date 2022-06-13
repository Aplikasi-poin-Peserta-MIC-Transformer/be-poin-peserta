const { Point } = require('../models')

class PointController {
  static async add(req, res, next) {
    try {
      const scanResult = req.body.scan_result
      const pointAdded = req.body.point_add
      const resultArr = scanResult.split('/');
      const pointData = {
        TeamId_or_UserId: resultArr[2],
        total_poin: +pointAdded,
        status: resultArr[0]
      }
      const newPoint = await Point.create(pointData);
      const { TeamId_or_UserId, status, total_poin } = newPoint;
      res.status(201).json({ TeamId_or_UserId, status, total_poin });
    }
    catch(err) {
      next(err)
    };
  }

  static async update(req, res, next) {
    try {
      const scanResult = req.body.scan_result
      const pointAdded = req.body.point_add
      const resultArr = scanResult.split('/')
      const scannedId = resultArr[2]
      const userPoint = await Point.findOne({
        where: { TeamId_or_UserId: scannedId }
      });
      const pointData = {
        total_poin: +userPoint.total_poin + +pointAdded
      }
      const updatedPoint = await Point.update(pointData, {
        where: { TeamId_or_UserId: scannedId },
        returning: true
      })
      res.status(200).json('Point has been updated');
    }
    catch(err) {
      next(err)
    };
  }
}

module.exports = PointController