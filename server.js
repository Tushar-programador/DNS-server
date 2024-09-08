const dns2 = require("dns2");
const { Packet } = dns2;
const Cache = require("./cache");
const { log } = require("./logger");
const { getDNSRecord } = require("./dnsRecords");

const cache = new Cache();
const port = 5339;

const server = dns2.createServer({
  udp: true,
  handle: async (request, send) => {
    try {
      const response = Packet.createResponseFromRequest(request);
      const [question] = request.questions;
      const { name, type } = question;

      log(`Received query for ${name} with type ${type}`);

      const cacheKey = `${name}:${type}`;
      let answer = cache.get(cacheKey);

      if (!answer) {
        log(`Cache miss for ${cacheKey}`);

        const records = await getDNSRecord(name, type);
        if (records.length > 0) {
          response.answers = records.map((record) => ({
            name: record.name,
            type: Packet.TYPE[record.type],
            class: Packet.CLASS[record.class],
            ttl: record.ttl,
            address: record.address || record.exchange, // Handle A, AAAA, and MX types
          }));

          cache.set(cacheKey, response.answers);
          log(`Caching response for ${cacheKey}`);
        } else {
          log(`No records found for ${name}`);
          // If no records are found, don't respond with external DNS, just send the response with no answer.
        }

        answer = response.answers || [];
      } else {
        log(`Cache hit for ${cacheKey}`);
        response.answers = answer;
      }

      send(response);
    } catch (error) {
      log(`Error processing DNS query: ${error.message}`);
    }
  },
});

server.listen({ udp: port });

server.on("listening", () => {
  log(`DNS Server is listening on UDP port ${port}`);
});
