const CryptoJS = require("crypto-js");

class Crypto {
  static encrypt (password) {
    return CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
  };

  static decrypt (password) {
    return CryptoJS.AES.decrypt(password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
  };
};

module.exports = Crypto;