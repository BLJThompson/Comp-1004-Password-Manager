// JavaScript source code
// add-password.js

// Function to toggle the visibility of the add password form
function toggleAddPasswordForm() {
    // Check if the form already exists
    var existingForm = document.getElementById('dynamicPasswordForm');
    if (existingForm) {
        // If the form exists, toggle its visibility
        existingForm.style.display = existingForm.style.display === 'none' ? 'block' : 'none';
    } else {
        // If the form doesn't exist, create it
        var form = document.createElement('form');
        form.id = 'dynamicPasswordForm';
        form.className = 'password-form';

        // Add form elements
        var formHTML = `
            <div class="add-password-form-close-button-container">
                <button type="button" class="add-password-form-close-button">X</button>
            </div>
            <div class="add-password-form-group">
                <label for="websiteName" class="add-password-form-label">Website Name:</label>
                <input type="text" id="websiteName" name="websiteName" class="add-password-form-input" required>
            </div>
            <div class="add-password-form-group">
                <label for="websiteURL" class="add-password-form-label">Website URL:</label>
                <input type="text" id="websiteURL" name="websiteURL" class="add-password-form-input">
            </div>
            <div class="add-password-form-group">
                <label for="username" class="add-password-form-label">Username:</label>
                <input type="text" id="username" name="username" class="add-password-form-input">
            </div>
            <div class="add-password-form-group">
                <label for="password" class="add-password-form-label">Password:</label>
                <div class="add-password-password-input-group">
                    <input type="password" id="password" name="password" class="add-password-form-input password-input">
                    <button type="button" class="add-password-password-toggle-button">Show</button>
                </div>
                <div id="passwordStrengthDisplay" class="add-password-password-strength">Password Strength: N/A</div>
            </div>

            <div class="add-password-form-group">
                <label for="confirmPassword" class="add-password-form-label">Confirm Password:</label>
                <div class="add-password-password-input-group">
                    <input type="password" id="confirmPassword" name="confirmPassword" class="add-password-form-input password-input">
                    <button type="button" class="add-password-password-toggle-button">Show</button>
                </div>
                <div class="add-password-generate-password">
                    <button type="button" id="addGenerateButton" class="add-password-generate-button">Generate Password</button>
                </div>
            </div>
            <div class="form-action">
                <button type="submit" id="addPasswordButton" class="add-password-submit-button">Add New Password</button>
            </div>
        `;
        form.innerHTML = formHTML;

        // Append the form to the parent div
        var parentDiv = document.querySelector('.passwordformdiv');
        parentDiv.appendChild(form);

        // Add event listeners
        form.querySelector('.add-password-form-close-button').addEventListener('click', closePasswordForm);
        form.querySelectorAll('.add-password-password-toggle-button').forEach(button => {
            button.addEventListener('click', function () {
                toggleAddPasswordVisibility(button.previousElementSibling.id);
            });
        });
        form.querySelector('#addGenerateButton').addEventListener('click', AddGeneratedPassword);
        form.addEventListener('submit', addPasswordFormSubmit);
    }
}


// Function to handle form submission
function addPasswordFormSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

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

    // Scroll to the new password
    const userDataDiv = document.getElementById('userData');
    userDataDiv.scrollTop = userDataDiv.scrollHeight;
    window.scrollTo(0, document.body.scrollHeight);
    closePasswordForm();
}
// Function to close the add password form
function closePasswordForm() {
    var form = document.getElementById('dynamicPasswordForm');
    if (form) {
        form.style.display = 'none';
    }
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

// Function to generate a random password
function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
    let password = "";
    for (let i = 0; i < length; ++i) {
        let randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// Function to invoke password generation and fill the fields
function AddGeneratedPassword() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const generatedPassword = generatePassword(12);
    passwordInput.value = generatedPassword;
    confirmPasswordInput.value = generatedPassword;

    showPasswordStrength();
}
// Function to show password strength
function showPasswordStrength() {
    const passwordInput = document.getElementById('password');
    const passwordStrengthDisplay = document.getElementById('passwordStrengthDisplay');
    const strength = passwordInput.value ? evaluatePasswordStrength(passwordInput.value) : 'N/A';
    passwordStrengthDisplay.textContent = `Password Strength: ${strength}`;
}
// Event listener for form submission
document.addEventListener('DOMContentLoaded', (event) => {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', showPasswordStrength);
    }
});