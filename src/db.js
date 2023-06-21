// Using MongoDB driver
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://mosacho1408:Mosacho1408@cluster0.7ygedx4.mongodb.net/?retryWrites=true&w=majority';

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

const VegetablesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Vegetables = new mongoose.model('Vegetables', VegetablesSchema);
module.exports = Vegetables

const FruitsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Fruits = new mongoose.model('Fruits', FruitsSchema);
module.exports = Fruits

const OthersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Others = new mongoose.model('Others', OthersSchema);
module.exports = Others



// Create a user schema and model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const User = new mongoose.model('Users', UserSchema);
module.exports = User
