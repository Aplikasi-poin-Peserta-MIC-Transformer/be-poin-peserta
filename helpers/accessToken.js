const jwt = require("jsonwebtoken");

class AccessToken {
  static generate (payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '5d'})
  };

  static verify (token, callback) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, user)
      }
    });
  };
};

module.exports = AccessToken;