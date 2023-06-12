// Client-side code
document.addEventListener('DOMContentLoaded', function() {
  // Fetch top hot sales data from the server using AJAX
  fetch('/api/top-sales')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Populate the top sales section with the received data
      var topSalesContainer = document.getElementById('top-sales');
      data.forEach(function(product) {
        var card = createProductCard(product);
        topSalesContainer.appendChild(card);
      });
    })
    .catch(function(error) {
      console.log('Error fetching top sales:', error);
    });
});

// Helper function to create a product card element
function createProductCard(product) {
  var card = document.createElement('div');
  card.className = 'card';

  var img = document.createElement('img');
  img.src = product.image;
  img.className = 'card-img-top';
  card.appendChild(img);

  var cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  var title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = product.name;
  cardBody.appendChild(title);

  var price = document.createElement('p');
  price.className = 'card-text';
  price.textContent = 'Price: $' + product.price;
  cardBody.appendChild(price);

  var addToCartBtn = document.createElement('button');
  addToCartBtn.className = 'btn btn-primary';
  addToCartBtn.textContent = 'Add to Cart';
  addToCartBtn.addEventListener('click', function() {
    // Add the product to the cart
    addToCart(product);
  });
  cardBody.appendChild(addToCartBtn);

  card.appendChild(cardBody);

  return card;
}

// Function to add a product to the cart (implement according to your needs)
function addToCart(product) {
  // Implement the functionality to add a product to the cart
  // This can involve making an AJAX request to the server to update the cart
}
