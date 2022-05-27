const { Team } = require('../models')

async function authorization (req, res, next) {
  const id = req.team.id
  const team = await Team.findOne({
    where: { id }
  })
  if (req.team.id === team.id) {
    next()
  } else {
    res.status(403).json({ message: "You are unauthorized to do this action!" })
  }
}

module.exports = authorization