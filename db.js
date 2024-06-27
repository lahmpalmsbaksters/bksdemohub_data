const { MongoClient } = require("mongodb");
require("dotenv").config();

const url = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;

let db;

async function connectToDatabase() {
  if (db) return db;

  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  db = client.db(dbName);
  console.log("Connected to database");
  return db;
}

module.exports = connectToDatabase;
