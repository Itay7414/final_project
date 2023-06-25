// Using MongoDB driver
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://mosacho1408:Mosacho1408@cluster0.7ygedx4.mongodb.net/<database_name>?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('Cluster0');
    console.log('Connected to the database');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
}

function getDatabase() {
  return db;
}

module.exports = { connectToDatabase, getDatabase };


// Using Mongoose
const mongoose = require('mongoose');


async function connectToDatabase() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
}

function getDatabase() {
  return mongoose.connection;
}

module.exports = { connectToDatabase, getDatabase };
