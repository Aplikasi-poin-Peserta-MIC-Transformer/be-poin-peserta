const { Admin } = require('../models')

async function adminAuthorization (req, res, next) {
  const id = req.user.id
  const admin = await Admin.findOne({
    where: { id }
  })
  if (req.user.id === admin.id) {
    next()
  } else {
    res.status(403).json({ message: "You are unauthorized to do this action!" })
  }
}

module.exports = adminAuthorization