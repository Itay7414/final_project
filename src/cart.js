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




document.addEventListener('DOMContentLoaded', () => {
  const addToCartForms = document.querySelectorAll('.card-button');
  addToCartForms.forEach((form) => {
    form.addEventListener('click', handleAddToCart);
  });
});

function handleAddToCart(event) {
  const button = event.target;
  const card = button.closest('.card');
  const product = card.querySelector('.text-title').textContent;
  const weightInput = card.querySelector('.card-input input');
  const weight = weightInput.value;

  const cartItem = {
    product: product,
    weight: weight
  };

  fetch('/add-to-cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItem),
  })
    .then((response) => {
      if (response.ok) {
        alert('Item added to cart successfully');
      } else {
        alert('Error adding item to cart');
      }
    })
    .catch((error) => {
      console.error('Error adding item to cart:', error);
    });
}
