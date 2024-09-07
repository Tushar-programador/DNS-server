const NodeCache = require("node-cache");
const dnsCache = new NodeCache({ stdTTL: 300 }); // Cache TTL of 5 minutes

function get(name) {
  return dnsCache.get(name);
}

function set(name, answers) {
  dnsCache.set(name, answers);
}

module.exports = { cache: { get, set } };
