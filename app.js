const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://mosacho1408:Mosacho1408@cluster0.7ygedx4.mongodb.net/Shukis-Yarkania?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.log('Error connecting to the database:', error);
  });

// Create a user schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Set up the signup route
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // Create a new user
  const newUser = new User({ email, password });

  // Save the user to the database
  newUser.save()
    .then(() => {
      res.send('User registered successfully');
    })
    .catch((error) => {
      res.status(500).send('Error registering user');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
