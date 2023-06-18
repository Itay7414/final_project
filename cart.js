// Get the cart items from localStorage
var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to render the cart items
function renderCartItems() {
    var cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        var emptyCartMsg = document.createElement('p');
        emptyCartMsg.textContent = 'Your cart is empty!';
        emptyCartMsg.classList.add('empty-cart-message');
        cartContainer.appendChild(emptyCartMsg);
        return;
    }

    var table = document.createElement('table');
    table.classList.add('cart-table');

    // Create table header
    var tableHeader = document.createElement('tr');
    tableHeader.innerHTML = `
    <th>Amount</th>
    <th>Name</th>
    <th>Price per Unit</th>
    <th>Price (Double Amount)</th>
  `;
    table.appendChild(tableHeader);

    // Create table rows
    cartItems.forEach(function (item) {
        var [amount, name, pricePerUnit] = item.split('|');
        var doubleAmountPrice = (parseFloat(pricePerUnit) * 2).toFixed(2);

        var row = document.createElement('tr');
        row.innerHTML = `
      <td>${amount}</td>
      <td>${name}</td>
      <td>$${pricePerUnit}</td>
      <td>$${doubleAmountPrice}</td>
    `;

        table.appendChild(row);
    });

    cartContainer.appendChild(table);
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
