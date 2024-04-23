// JavaScript source code
// add-password.js

// Function to handle form submission
function addPasswordFormSubmit() {

    // Get references to form elements
    const websiteNameInput = document.getElementById('websiteName');
    const websiteURLInput = document.getElementById('websiteURL');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Get values from form fields
    const websiteName = websiteNameInput.value.trim();
    const websiteURL = websiteURLInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validate if password and confirm password match
    if (password !== confirmPassword) {
        alert("Passwords don't match.");
        return;
    }

    // Initialize userData as an empty array if it's not defined
    if (!userData) {
        userData = [];
    }

    // Create a new password object
    const newId = userData.length + 1;
    const newWebsiteObject = {
        "website": {
            "id": newId.toString(),
            "url": websiteURL,
            "name": websiteName,
            "notes": "",
            "categories": "",
            "credentials": {
                "username": username,
                "password": password,
            }
        }
    };

    // Append the new password object to userData
    userData.push(newWebsiteObject);

    // Update the display
    displayUserData(userData);

    // Clear the form fields after submission
    websiteNameInput.value = '';
    websiteURLInput.value = '';
    usernameInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';

}
// Function to toggle password visibility
function toggleAddPasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const button = passwordInput.nextElementSibling;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        button.innerText = 'Hide';
    } else {
        passwordInput.type = 'password';
        button.innerText = 'Show';
    }
}