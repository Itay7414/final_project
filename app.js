$(document).ready(function() {
    // Sample data for fruits, vegetables, and others
    var fruitsData = [
      { name: 'Apple', price: 1.99, image: 'images/apple.png' },
      { name: 'Banana', price: 0.99, image: 'images/banana.png' },
      { name: 'Orange', price: 0.79, image: 'images/orange.png' }
    ];
    
    var vegetablesData = [
      { name: 'Carrot', price: 0.49, image: 'images/carrot.png' },
      { name: 'Broccoli', price: 0.89, image: 'images/broccoli.png' },
      { name: 'Tomato', price: 0.69, image: 'images/tomato.png' }
    ];
    
    var othersData = [
      { name: 'Milk', price: 2.49, image: 'images/milk.png' },
      { name: 'Bread', price: 1.99, image: 'images/bread.png' },
      { name: 'Eggs', price: 2.99, image: 'images/eggs.png' }
    ];
  
    // Helper function to create a product card element
    function createProductCard(product) {
      var card = $('<div>').addClass('card').data('product', product);
      var img = $('<img>').attr('src', product.image);
      var title = $('<h3>').text(product.name);
      var price = $('<p>').text('Price: $' + product.price.toFixed(2));
      var addToCartBtn = $('<button>').text('Add to Cart').addClass('add-to-cart-btn');
      
      card.append(img, title, price, addToCartBtn);
      return card;
    }
  
    // Initialize the products on each page
    function initializePageProducts(pageData, pageContainer) {
      for (var i = 0; i < pageData.length; i++) {
        var product = pageData[i];
        var card = createProductCard(product);
        pageContainer.append(card);
      }
    }
  
    // Initialize the fruits, vegetables, and others pages
    var fruitsContainer = $('.fruits-container');
    var vegetablesContainer = $('.vegetables-container');
    var othersContainer = $('.others-container');
  
    initializePageProducts(fruitsData, fruitsContainer);
    initializePageProducts(vegetablesData, vegetablesContainer);
    initializePageProducts(othersData, othersContainer);
  
    // Handle "Add Item" button click
    $(document).on('click', '.add-item-img', function() {
      var price = prompt('Enter the price of the item:');
      var name = prompt('Enter the name of the item:');
      
      if (price && name) {
        var product = {
          name: name,
          price: parseFloat(price),
          image: 'images/add-item.png'
        };
      
        var card = createProductCard(product);
        var productContainer = $(this).closest('.product-container');
        productContainer.append(card);
      }
    });
  });
  