const { MongoClient } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection URL
const mongoURL = 'mongodb+srv://mosacho1408:Mosacho1408@cluster0.7ygedx4.mongodb.net/Shukis-Yarkania?retryWrites=true&w=majority'; // Replace with your actual MongoDB connection string

// Database and collection names
const dbName = 'Shukis-Yarkania';
const itemCollectionName = 'items';
const userCollectionName = 'users';

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Failed to connect to the database:', err));

// Define item schema and model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Item = mongoose.model('Item', itemSchema);

// Define user schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB using the native MongoDB driver
MongoClient.connect(mongoURL, function (err, client) {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB successfully');

  const db = client.db(dbName);

  // Get the item collection
  const itemCollection = db.collection(itemCollectionName);

  // Perform item-related database operations
  // ...

  // Get the user collection
  const userCollection = db.collection(userCollectionName);

  // Perform user-related database operations
  // ...

  // Close the MongoDB connection
  client.close();
});

// Middleware
app.use(express.json());

// Routes
app.post('/items', (req, res) => {
  const { name, image, price, quantity } = req.body;

  const newItem = new Item({
    name,
    image,
    price,
    quantity,
  });

  newItem.save()
    .then(() => res.status(201).json(newItem))
    .catch((err) => res.status(500).json({ error: 'Failed to save item to database' }));
});

app.post('/users', (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({
    email,
    password,
  });

  newUser.save()
    .then(() => res.status(201).json(newUser))
    .catch((err) => res.status(500).json({ error: 'Failed to save user to database' }));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
