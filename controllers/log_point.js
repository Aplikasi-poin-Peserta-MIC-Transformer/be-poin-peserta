const { Log_point } = require('../models')

class LogPointController {
  static async findLogByUser(req, res, next) {
    const UserId = req.params.id
    try {
      const logs = await Log_point.findAll({
        where: { UserId }
      });
      if (!logs) {
        res.status(401).json({ message: 'No point log yet' });
      } else {
        res.status(200).json(logs);
      }
    } 
    catch (err) {
      next(err)
    }
  }
}

module.exports = LogPointController