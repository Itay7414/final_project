// database.js

const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

// MongoDB connection URL
const mongoURL = 'mongodb+srv://mosacho1408:Mosacho1408@cluster0.7ygedx4.mongodb.net';

// Database and collection names
const dbName = 'Shukis-Yarkania1';
const itemCollectionName = 'items';
const userCollectionName = 'users';

// Connect to MongoDB using MongoClient
const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
}

function getDatabase() {
    return db;
}

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Define item schema and model using Mongoose
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const Item = mongoose.model('Item', itemSchema);

// Define user schema and model using Mongoose
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Create an instance of the Express application
const app = express();

// Parse request bodies as JSON
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

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

module.exports = { connectToDatabase, getDatabase };
