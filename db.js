const { MongoClient } = require('mongodb');

const url = 'mongodb://pr9fmcgvoc:pr9fmcgvoc12345@52.77.210.199:27017/';
const dbName = 'bksdemohub_sondhana';

let db;

async function connectToDatabase() {
  if (db) return db;

  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  db = client.db(dbName);
  console.log('Connected to database');
  return db;
}

module.exports = connectToDatabase;
