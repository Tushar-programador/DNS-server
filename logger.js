const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "dns.log");

function log(message) {
  const timeStamp = new Date().toISOString();
  const logMessage = `[${timeStamp}] ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
  console.log(logMessage);
}

module.exports = { log };
