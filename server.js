const dns2 = require("dns2");
const { UDPServer } = dns2;
const { cache } = require("./cache");
const { getDNSRecord } = require("./dnsRecords");
const logger = require("./logger");

const server = UDPServer({
  handle: async (request, send, rinfo) => {
    const { questions } = request;
    const [question] = questions;
    const { name } = question;

    logger.log(`DNS query for ${name}`);

    // First check cache
    const cachedRecord = cache.get(name);
    if (cachedRecord) {
      logger.log(`Cache hit for ${name}`);
      return send({
        answers: cachedRecord,
      });
    }

    // Get DNS record from database or file
    const answers = await getDNSRecord(name);

    if (answers.length > 0) {
      cache.set(name, answers); // Cache the result
    }

    return send({
      answers,
    });
  },
});

// Start the server on port 5333
server.listen(5333, () => {
  console.log("DNS Server running on port 5333");
});
