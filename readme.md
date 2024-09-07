# Custom DNS Server

This project is a custom DNS server built using Node.js. The server resolves domain names to IP addresses and supports caching for improved performance.

## Features

- DNS resolution for A records
- Caching for fast lookups
- Logging of DNS queries
- Dockerized for easy deployment


## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the DNS server: `npm start`
4. Test with `nslookup` or `dig`:

```bash
nslookup example.com 127.0.0.1
