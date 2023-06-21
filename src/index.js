const express = require("express")
const app = express()
const path = require("path")
const ejs = require("ejs")
//const {check,validationResult}=require('express-validator ')
const bodyParser = require('body-parser')
//const { template } = require("handlebars")
//const { request } = require("http")
const collection = require("./mongodb")
//app.use=(express.static(path.join(__dirname,'views')));
app.use(express.json())
//const urlencodedParser=bodyParser.urlencoded({extended:false})
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs")
const Vegetables = require("./mongodb")
const Fruits = require("./mongodb")
const Others = require("./mongodb")
const User = require("./mongodb")

//app.engine('ejs', require('ejs').__express);
app.use(express.static(path.join(__dirname, './public')))//מקשר את הדפי ejs  ל css רק להוסיף לינק לכל אחד מהם


app.get("/", (req, res) => {
  res.render("login.ejs", { alertMessage: "" });
})

app.get("/signup", (req, res) => {
  //res.render("signup") 
  res.render("signup.ejs", { alertMessage: "" });
})
app.get("/home", (req, res) => {
  //res.render("signup") 
  res.render("home.ejs", { alertMessage: "" });
})

app.post("/signup", async (req, res) => {

  const checkk = await collection.findOne({ name: req.body.name })
  if (checkk != null) {
    //res.send("name taken")
    let alertMessage = " Username already taken";
    res.render("home.ejs", { alertMessage: "" });
    // res.render("signup.ejs", { alertMessage: "Username already taken" });

  }
  else if (req.body.name == '' || req.body.password == '') {
    let alertMessage = " Fill the missing info";
    res.render("signup", { alertMessage });
  }
  else {
    const data = {
      name: req.body.name,
      password: req.body.password
    };
    try {
      await collection.insertMany([data]);
      let alertMessage = "Hi " + req.body.name;
      res.render("home", { alertMessage }); // Changed this line
    } catch (error) {
      console.error(error);
      let alertMessage = " Error occurred while signing up";
      res.render("signup", { alertMessage }); // Changed this line
    }

    //await collection.insertMany([data])
    //let alertMessage = "you succsfully sign up";
    //res.render("signup", { alertMessage});

  }

})


app.post("/login", async (req, res) => {

  try {
    const check = await collection.findOne({ name: req.body.name })
    if (check.password === req.body.password) {
      let alertMessage = "Hi " + req.body.name
      res.render("home.ejs", { alertMessage });

    }
    else {
      let alertMessage = " wrong password"
      res.render("login", { alertMessage })
    }

  }
  catch {
    let alertMessage = " wrong details"
    res.render("login", { alertMessage })
  }

})
















$(document).ready(function () {
  // Fetch and display products for each category
  fetchProducts('fruits', 'fruits-container');
  fetchProducts('vegetables', 'vegetables-container');
  fetchProducts('others', 'others-container');

  // Handle "Add to Cart" button click
  $(document).on('click', '.add-to-cart-btn', function () {
    var product = $(this).closest('.card').data('product');
    var amount = parseInt($(this).siblings('.amount-input').val());
    addToCart(product, amount);
  });

  // Handle "Back to Home" button click
  $(document).on('click', '.back-to-home-btn', function () {
    window.location.href = 'index.html';
  });

  // Handle "User Profile" button click
  $(document).on('click', '#user-profile-btn', function () {
    window.location.href = 'userprofile.html';
  });

  // Handle "Stores Addresses" button click
  $(document).on('click', '#stores-addresses-btn', function () {
    window.open('https://goo.gl/maps/b5cY9fv4N6wpfBug8');
    window.open('https://goo.gl/maps/ALPT1hZNVEtnNrqu9');
  });

  // Fetch and display products based on category
  function fetchProducts(category, containerId) {
    $.get('/api/products', { category: category }, function (products) {
      var productContainer = $('#' + containerId);
      productContainer.empty();

      products.forEach(function (product) {
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
    $.post('/api/cart', { product: product, amount: amount }, function (response) {
      // Handle the response from the server
      console.log(response);
    });
  }
});

// index.js
$(document).ready(function () {
  $('.cart-btn').click(function () {
    window.location.href = 'cart.html'; // Change 'cart.html' to the desired page URL
  });
});
function openStoreMapPage() {
  // Open a new page or redirect the user to the store map page
  window.open("store_map.html", "_blank");
}




//OBJECT ADDING************************************** 
//******************************************
//****************************************** 

//ADD Fruits
app.get("/fruits", (req, res) => {
  res.render("fruits", { alertMessage: "" });
  console.log("ok")
})
app.post("/fruits", async (req, res) => {

  let isValid = await Fruits.findOne({ name: req.body.name })
  if (isValid != null && req.body.amount >= 0 && req.body.price >= 0) {
    req.body.amount += isValid.body.amount;
  }
  else if (req.body.name == '' || req.body.color == '' || req.body.matter == '' || req.body.amount == '' || req.body.pic == '' || req.body.price == '' || req.body.amout < 0 || req.body.price < 0) {
    let aler = "wront info"
    res.render("fruits.ejs", { aler })
  }
  else {
    let info = {
      name: req.body.name,
      color: req.body.color,
      matter: req.body.matter,
      amout: req.body.amount,
      pic: req.body.pic,
      price: req.body.price
    }
    try {
      await Fruits.insertMany([info])
      let al = "all is done!"
      res.render("home", { al });
    }
    catch (error) {
      console.error(error);
      let alertMessage = "Error";
      res.render("fruits.ejs", { alertMessage });
    }
  }
})
//ADD vegetables
app.get("/vegetables", (req, res) => {
  res.render("vegetables", { alertMessage: "" });
  console.log("ok")
})
app.post("/vegetables", async (req, res) => {

  let isValid = await Vegetables.findOne({ name: req.body.name })
  if (isValid != null && req.body.amount >= 0 && req.body.price >= 0) {
    req.body.amount += isValid.body.amount;
  }
  else if (req.body.name == '' || req.body.color == '' || req.body.matter == '' || req.body.amount == '' || req.body.pic == '' || req.body.price == '' || req.body.amout < 0 || req.body.price < 0) {
    let aler = "wront info"
    res.render("vegetables.ejs", { aler })
  }
  else {
    let info = {
      name: req.body.name,
      color: req.body.color,
      matter: req.body.matter,
      amout: req.body.amount,
      pic: req.body.pic,
      price: req.body.price
    }
    try {
      await Vegetables.insertMany([info])
      let al = "all is done!"
      res.render("home", { al });
    }
    catch (error) {
      console.error(error);
      let alertMessage = "Error";
      res.render("vegetables.ejs", { alertMessage });
    }
  }
})

//ADD vegetables
app.get("/others", (req, res) => {
  res.render("others", { alertMessage: "" });
  console.log("ok")
})
app.post("/others", async (req, res) => {

  let isValid = await Other.findOne({ name: req.body.name })
  if (isValid != null && req.body.amount >= 0 && req.body.price >= 0) {
    req.body.amount += isValid.body.amount;
  }
  else if (req.body.name == '' || req.body.color == '' || req.body.matter == '' || req.body.amount == '' || req.body.pic == '' || req.body.price == '' || req.body.amout < 0 || req.body.price < 0) {
    let aler = "wront info"
    res.render("others.ejs", { aler })
  }
  else {
    let info = {
      name: req.body.name,
      color: req.body.color,
      matter: req.body.matter,
      amout: req.body.amount,
      pic: req.body.pic,
      price: req.body.price
    }
    try {
      await Others.insertMany([info])
      let al = "all is done!"
      res.render("home", { al });
    }
    catch (error) {
      console.error(error);
      let alertMessage = "Error";
      res.render("others.ejs", { alertMessage });
    }
  }
})


app.listen(3000, () => {
  console.log("port connected")
})