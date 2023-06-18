// Get the cart items from localStorage
var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to render the cart items
function renderCartItems() {
    var cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    var cartList = document.createElement('ul');
    cartItems.forEach(function (item) {
        var listItem = document.createElement('li');
        listItem.textContent = item;
        cartList.appendChild(listItem);
    });

    cartContainer.appendChild(cartList);
}

// Render the cart items on page load
window.addEventListener('load', function () {
    renderCartItems();
});

// Function to add items to the cart
function addToCart(item) {
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();
}
function goToHomePage() {
    window.location.href = 'index.html';
}
