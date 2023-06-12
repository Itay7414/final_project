$(document).ready(function() {
  // Fetch and display products for each category
  fetchProducts('fruits', 'fruits-container');
  fetchProducts('vegetables', 'vegetables-container');
  fetchProducts('others', 'others-container');

  // Handle "Add to Cart" button click
  $(document).on('click', '.add-to-cart-btn', function() {
    var product = $(this).closest('.card').data('product');
    var amount = parseInt($(this).siblings('.amount-input').val());
    addToCart(product, amount);
  });

  // Handle "Back to Home" button click
  $(document).on('click', '.back-to-home-btn', function() {
    window.location.href = 'index.html';
  });

  // Fetch and display products based on category
  function fetchProducts(category, containerId) {
    $.get('/api/products', { category: category }, function(products) {
      var productContainer = $('#' + containerId);
      productContainer.empty();

      products.forEach(function(product) {
        var card = createProductCard(product);
        productContainer.append(card);
      });
    });
  }

  // Helper function to create a product card element
  function createProductCard(product) {
    var card = $('<div>').addClass('card').data('product', product);
    var img = $('<img>').attr('src', product.image);
    var title = $('<h3>').text(product.name);
    var price = $('<p>').text('Price: $' + product.price.toFixed(2));
    var addToCartBtn = $('<button>').text('Add to Cart').addClass('add-to-cart-btn');
    var quantityLabel = $('<label>').text('Quantity:');
    var quantityInput = $('<input>').addClass('amount-input').attr({
      type: 'number',
      min: '1',
      max: '10',
      value: '1'
    });

    card.append(img, title, price, quantityLabel, quantityInput, addToCartBtn);
    return card;
  }

  // Add the "Add to Cart" functionality using AJAX calls to update the cart
  function addToCart(product, amount) {
    $.post('/api/cart', { product: product, amount: amount }, function(response) {
      // Handle the response from the server
      console.log(response);
    });
  }
});
