class Cache {
  constructor(ttl = 300) {
    this.ttl = ttl * 1000; // Cache time-to-live in milliseconds
    this.records = new Map();
  }

  get(name) {
    const record = this.records.get(name.toLowerCase());
    if (record && Date.now() - record.timestamp < this.ttl) {
      console.log(`Cache hit for ${name}`);
      return record.data;
    }
    console.log(`Cache miss for ${name}`);
    return null;
  }

  set(name, data) {
    console.log(`Caching response for ${name}`);
    this.records.set(name.toLowerCase(), {
      timestamp: Date.now(),
      data: data,
    });
  }
}

module.exports = Cache;
