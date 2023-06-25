const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

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

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Create a cart schema and model
const cartSchema = new mongoose.Schema({
  product: { type: String, required: true },
  weight: { type: Number, required: true }
});

const Cart = mongoose.model('Cart', cartSchema);

// Set up the route to handle adding items to the cart
app.post('/add-to-cart', (req, res) => {
  const { product, weight } = req.body;

  // Validate the product and weight
  if (!product || !weight || isNaN(parseFloat(weight)) || parseFloat(weight) <= 0) {
    res.status(400).json({ error: 'Invalid product or weight' });
    return;
  }

  // Create a new cart item
  const newCartItem = new Cart({ product, weight });

  // Save the cart item to the database
  newCartItem.save()
    .then(() => {
      res.send('Item added to cart successfully');
    })
    .catch((error) => {
      console.log('Error adding item to cart:', error);
      res.status(500).send('Error adding item to cart');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
