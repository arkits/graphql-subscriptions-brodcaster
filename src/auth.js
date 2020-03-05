const bcrypt = require("bcrypt");

// hunter2 XD
const hash = "$2b$10$S62GeUOMq2o2Rcprdg7UsOPQTKaq/X0lcyAmFQNAqjFX9afzWI0fe";

async function checkAuth(plainTextPassword) {
  const result = await bcrypt.compare(plainTextPassword, hash);
  return result;
}

module.exports = {
  checkAuth
};
