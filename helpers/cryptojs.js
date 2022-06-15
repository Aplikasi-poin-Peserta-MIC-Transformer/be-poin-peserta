const CryptoJS = require("crypto-js");
const { SECRET_KEY } = require("../config.json");

class Crypto {
  static encrypt (password) {
    return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  };

  static decrypt (password) {
    return CryptoJS.AES.decrypt(password, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  };
};

module.exports = Crypto;