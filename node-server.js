const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import the User model
const User = require('./user');

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://mosacho1408:Mosacho1408@cluster0.7ygedx4.mongodb.net/Shukis-Yarkania?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });

// Create an instance of the Express application
const app = express();

// Parse request bodies as JSON
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route for handling the signup form submission
app.post('/signup', (req, res) => {
  // Retrieve the email and password from the request body
  const { email, password } = req.body;

  // Create a new user instance
  const user = new User({
    email: email,
    password: password,
  });

  // Save the user to the database
  user
    .save()
    .then(() => {
      res.status(200).send('User registered successfully');
    })
    .catch((err) => {
      console.error('Failed to register user:', err);
      res.status(500).send('Failed to register user');
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
