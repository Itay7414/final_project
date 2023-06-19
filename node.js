const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017'; // Replace with your actual MongoDB connection string

// Database and collection names
const dbName = 'your-database-name';
const collectionName = 'your-collection-name';

// Connect to MongoDB
MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB successfully');

  // Get the database and collection
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  // Perform database operations
  // ...

  // Close the MongoDB connection
  client.close();
});
