$(document).ready(function() {
  $('#signup-form').submit(function(e) {
    e.preventDefault();

    // Collect form data
    var formData = {
      email: $('#email').val(),
      password: $('#password').val()
      // Add more fields as needed
    };

    // Send an AJAX request to the server
    $.ajax({
      type: 'POST',
      url: '/signup', // Server-side route to handle signup
      data: formData,
      success: function(response) {
        // Redirect to the home page or show a success message
        window.location.href = '/'; // Replace with your desired URL
      },
      error: function(error) {
        console.log(error);
        // Handle error
      }
    });
  });
});
