const dnsRecords = {
  "example.com": [
    {
      name: "example.com",
      type: "A",
      class: "IN",
      ttl: 300,
      address: "192.0.2.1",
    },
    {
      name: "example.com",
      type: "AAAA",
      class: "IN",
      ttl: 300,
      address: "2001:db8::1",
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
    {
      name: "mywebsite.com",
      type: "CNAME",
      class: "IN",
      ttl: 300,
      domain: "example.com",
    },
  ],
  "mailserver.com": [
    {
      name: "mailserver.com",
      type: "MX",
      class: "IN",
      ttl: 300,
      preference: 10,
      exchange: "mail.mailserver.com",
    },
  ],
};

// DNS type mapping
const dnsTypeMap = {
  1: "A",
  15: "MX",
  28: "AAAA",
  5: "CNAME",
};

async function getDNSRecord(domain, type) {
  const records = dnsRecords[domain];

  console.log(
    `Looking for records of type ${type} (${dnsTypeMap[type]}) for domain ${domain}`
  );

  if (!records) {
    console.log(`No records found for domain ${domain}`);
    return [];
  }

  // Filter based on the requested type using the dnsTypeMap
  const result = records.filter((record) => record.type === dnsTypeMap[type]);

  console.log(`Records found: ${JSON.stringify(result)}`);

  return result;
}

module.exports = { getDNSRecord };
