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

async function employee_exists(db_id, database)
{
  const result = await database.collection('Employees').find({"db_id": db_id}).toArray();
  console.log("LEN: " + result.length)
  return result.length > 0
}

async function add_user(user_data)
{
  rc = 200
  database = await get_database()
  
  db_id = user_data['db_id']
  if (await employee_exists(db_id, database))
  {
    return 400
  }

  const result = await database.collection('Employees')
  result.insertOne(user_data, function(err, res){
    if (err) throw err;
    console.log("1 user inserted");
    database.close();
  });

  return rc
}

async function update_user(user_data)
{
  rc = 200
  database = await get_database()
  
  db_id = user_data['db_id']
  if (!await employee_exists(db_id, database))
  {
    return 500
  }

  const collection = await database.collection('Employees')
  const result = await collection.updateOne({ "db_id": db_id }, { $set: user_data }, {})

  return rc
}

module.exports = { get_database, add_user, update_user }