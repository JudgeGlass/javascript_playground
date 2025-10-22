const MongoClient = require('mongodb').MongoClient;
const mongo_url = "mongodb://localhost:27017/testdatabase"

var db = null;

async function get_database() {
  if (db) {
    // If a connection already exists, return it
    console.log('Using existing database connection');
    return db;
  }

  try {
    // Create a new MongoClient instance
    const client = await MongoClient.connect(mongo_url);

    // Get the database from the client
    console.log('Database connected successfully');
    return client.db('testdatabase');  // Default database is 'mydatabase', but can be changed
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = get_database