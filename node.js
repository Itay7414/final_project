const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://mosacho1408:Mosacho1408@cluster0.7ygedx4.mongodb.net/Cluster0?retryWrites=true&w=majority'; // Replace with your actual MongoDB connection string

// Database and collection names
const dbName = 'Cluster0';
const collectionName = 'your-collection-name';

// Connect to MongoDB
MongoClient.connect(url, function (err, client) {
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


const express = require('express');
const app = express();

// Add middleware and routes here

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

