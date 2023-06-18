$(document).ready(function () {
    var profileInfoInputs = $('.profile-info input');
    var editProfileBtn = $('#edit-profile-btn');
    var saveProfileBtn = $('#save-profile-btn');

    editProfileBtn.click(function () {
        profileInfoInputs.prop('readonly', false);
        profileInfoInputs.addClass('edit-mode');
        editProfileBtn.hide();
        saveProfileBtn.show();
    });

    saveProfileBtn.click(function () {
        profileInfoInputs.prop('readonly', true);
        profileInfoInputs.removeClass('edit-mode');
        editProfileBtn.show();
        saveProfileBtn.hide();

        var firstName = $('#firstname').val();
        localStorage.setItem('firstName', firstName);

        // Perform any necessary actions to save the updated profile data
        // You can retrieve the updated values using profileInfoInputs.val()
        // and send them to the server or update them in your application

        window.location.href = 'index.html';
    });
});

