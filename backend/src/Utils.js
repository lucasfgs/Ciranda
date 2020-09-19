const bcrypt = require("bcrypt");

async function passwordEncrypt(password) {
  return await bcrypt.hash(password, 10);
}

async function passwordDecrypt(password, encryptedPassword) {
  return await bcrypt.compare(password, encryptedPassword);
}

module.exports = { passwordEncrypt, passwordDecrypt };
