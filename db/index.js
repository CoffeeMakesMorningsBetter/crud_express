const { Client } = require("pg");
const client = new Client({
  connectionString: "postgresql://localhost/cart"
});

client.connect();

module.exports = client;