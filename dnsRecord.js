const dnsRecords = {
  "example.com": [
    {
      name: "example.com",
      type: "A",
      class: "IN",
      ttl: 300,
      address: "192.0.2.1",
    },
  ],
  "mywebsite.com": [
    {
      name: "mywebsite.com",
      type: "A",
      class: "IN",
      ttl: 300,
      address: "192.0.2.2",
    },
  ],
};

async function getDNSRecord(domain) {
  return dnsRecords[domain] || [];
}

module.exports = { getDNSRecord };
