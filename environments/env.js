const devEnv = require("./dev.env");
const prodEnv = require("./prod.env");

module.exports = function getEnvVariable() {
  if(process.env.NODE_ENV === "production") {
    return prodEnv;
  }

  return devEnv;
}