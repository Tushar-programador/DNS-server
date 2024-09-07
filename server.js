const dns2 = require("dns2");
const { Packet } = dns2;
// const dnsRecords = require("./dnsRecords");
const dnsRecords = {
  "example.com": "192.0.2.1",
};

const server = dns2.createServer({
  udp: true,
  handle: (request, send) => {
    const response = Packet.createResponseFromRequest(request);
    const [question] = request.questions;

    console.log(`Received query for ${question.name}`);

    const ip = dnsRecords[question.name];
    if (ip) {
      response.answers.push({
        name: question.name,
        type: Packet.TYPE.A,
        class: Packet.CLASS.IN,
        ttl: 300,
        address: ip,
      });
    }

    send(response);
  },
});

server.listen({
  udp: 5339, // Ensure this port is correct
  address: "0.0.0.0", // Binding to all available interfaces
});

server.on("listening", () => {
  console.log("DNS Server is listening on UDP port 5339");
});

server.on("error", (error) => {
  console.error("Error occurred:", error);
});
