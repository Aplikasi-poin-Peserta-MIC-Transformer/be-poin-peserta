const AccessToken = require("../helpers/accessToken")

function authentication(req, res, next) {
  const token = req.headers.access_token
  if (token) {
    AccessToken.verify(token, (err, team) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid!" })
      } else {
        req.team = team
        next()
      }
    })
  } else {
    return res.status(401).json({ message: "Please login first!" })
  }
}

module.exports = authentication