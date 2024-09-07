const dns2 = require("dns2");
const { UDPServer } = dns2;


const dgram = require('dgram');
const client = dgram.createSocket('udp4');

client.send(Buffer.from('Hello, server'), 5354, '127.0.0.1', (err) => {
  if (err) console.error(err);
  client.close();
});

const server = new UDPServer({
  type: "udp4",
  handle: async (request, send, rinfo) => {
    console.log(`Received DNS request from ${rinfo.address}:${rinfo.port}`);

    const { questions } = request;
    const [question] = questions;
    const { name } = question;

    console.log(`Query for: ${name}`);

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
    console.log(`Response sent for: ${name}`);
  },
});

server.listen(5354, () => {
  console.log("DNS Server running on port 5354");
});

server.on("error", (err) => {
  console.error("Error:", err);
});

server.on("close", () => {
  console.log("Server closed");
});
