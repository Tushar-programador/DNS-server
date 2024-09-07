const dns2 = require("dns2");
const { UDPServer } = dns2;

const server = new UDPServer({
  type: "udp4",
  handle: async (request, send, rinfo) => {
    console.log("Received a DNS request!"); // Check if a request is received

    const { questions } = request;
    const [question] = questions;
    const { name } = question;

    console.log(`Query for: ${name}`); // Log the queried domain

    const answers = [
      {
        name,
        type: dns2.Packet.TYPE.A,
        class: dns2.Packet.CLASS.IN,
        ttl: 300,
        address: "192.0.2.1", // Example IP address for testing
      },
    ];

    send({ answers });
  },
});

server.listen(5333, () => {
  console.log("DNS Server running on port 53");
});
