// JavaScript source code
// addpassword.js

function showAddPasswordModal() {
    if (document.getElementById('addPasswordModal')) return;

    // Create modal backdrop element
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'add-password-modal-backdrop';
    document.body.appendChild(modalBackdrop);

    // Prevent scrolling
    document.body.classList.add('add-password-modal-open');

    const modalHTML = `
    <div id="addPasswordModal" class="add-password-modal-container">
    <div class="add-password-modal-content">
        <div class="add-password-modal-header">
            <button class="close-button" onclick="closeAddPasswordModal()">X</button>
            <h2>Add New Password</h2>
        </div>
        <form id="addPasswordForm" class="add-password-form">
            <div class="form-group website-name-group">
                <label for="websiteName" class="website-name-label">Website Name:</label>
                <input type="text" id="websiteName" class="website-name-input" placeholder="Website" required>
            </div>
            <div class="form-group website-url-group">
                <label for="websiteURL" class="website-url-label">Website URL:</label>
                <input type="text" id="websiteURL" class="website-url-input" placeholder="Website URL">
            </div>

            <div class="form-group website-notes-group">
                <label for="websiteNotes" class="website-notes-label">Notes:</label>
                <textarea id="websiteNotes" class="website-notes-input" placeholder="Notes"></textarea>
            </div>

            <div class="form-group username-group">
                <label for="username" class="username-label">Username:</label>
                <input type="text" id="username" class="username-input" placeholder="Username">
            </div>
            <div class="form-group password-group">
                <div class="password-field">
                    <label for="password" class="password-label">Password:</label>
                    <input type="password" id="websitePassword" class="password-input" placeholder="Password" oninput="updatePasswordStrength(this.value)">
                    <button type="button" class="show-password-btn" onclick="toggleModalPasswordVisibility('websitePassword')">Show</button>
                </div>
                    <div class="form-group password-strength-group">
                    <div id="passwordStrengthBar" class="password-strength-bar"></div>
                    <p>Password Strength: <span id="passwordStrengthDisplay" class="password-strength-indicator"></span></p>
                </div>
                <div class="form-group password-generator-group">
                    <button type="button" class="generate-password-btn" onclick="fillGeneratedPassword()">Generate Password</button>
                </div>
            </div>
            <div class="form-group confirm-password-group">
                <label for="confirmPassword" class="confirm-password-label">Confirm Password:</label>
                <input type="password" id="confirmPassword" class="confirm-password-input" placeholder="Confirm Password">
                <button type="button" class="show-confirm-password-btn" onclick="toggleModalPasswordVisibility('confirmPassword')">Show</button>
            </div>


            <div class="form-action-buttons">
                <button type="submit" class="save-password-btn">Save</button>
            </div>
        </form>
    </div>
    </div>
    `;


    // Find the div with the ID passwordFormDiv
    const passwordFormDiv = document.getElementById('passwordFormDiv');
    passwordFormDiv.innerHTML = modalHTML;
    document.getElementById('addPasswordForm').addEventListener('submit', saveNewPassword);
}

// Function to save the new password
function saveNewPassword(event) {
    event.preventDefault();

    // Extract form values
    const websiteName = document.getElementById('websiteName').value;
    const websiteURL = document.getElementById('websiteURL').value;
    const websiteNotes = document.getElementById('websiteNotes').value;
    const username = document.getElementById('username').value;
    const userpassword = document.getElementById('websitePassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check if passwords match
    // Proceed only if both passwords are either filled and match, or both are empty
    if (userpassword || confirmPassword) { 
        if (userpassword !== confirmPassword) {
            alert("Passwords do not match!");
            return; 
        }
    }


    function generateNextId(userData) {
        if (userData.length === 0) return "1"; 

        // Extract IDs and convert them to numbers
        const ids = userData.map(item => parseInt(item.website.id)).sort((a, b) => a - b);

        // Find the smallest missing number in the sorted array
        for (let i = 0; i < ids.length; i++) {
            if (ids[i] !== i + 1) {
                return (i + 1).toString();
            }
        }

        // If no gaps, return the next number after the highest ID
        return (ids.length + 1).toString();
    }

    // Create a new website object with the input values
    const newWebsiteData = {
        website: {
            id: generateNextId(userData),
            url: websiteURL || "",
            name: websiteName || "",
            websitenote: websiteNotes || "",
            categories: "",
            timecreated: getDateTime(),
            credentials: {
                username: username || "",
                userpassword: userpassword || ""
            }
        }
    };

    // Add the new entry to userdata
    userData.push(newWebsiteData);
    displayUserData(userData);
    closeAddPasswordModal();
    scrollToElement('dataDisplayContainer');
}

// Function to get data and time of creation
function getDateTime() {
    const date = new Date();
    return date.toLocaleString();
}

// Function to update the password strength indicator
function updatePasswordStrength(password) {

    const strengthResult = evaluatePasswordStrength(password);
    const strengthBar = document.getElementById('passwordStrengthBar');
    const strengthDisplay = document.getElementById('passwordStrengthDisplay');

    strengthBar.style.backgroundColor = strengthResult.color;
    strengthDisplay.textContent = strengthResult.label;
}

// Function to close the add password modal
function closeAddPasswordModal() {
    const modal = document.getElementById('addPasswordModal');
    const modalBackdrop = document.querySelector('.add-password-modal-backdrop');

    if (modal) {
        modal.remove();
    }

    if (modalBackdrop) {
        modalBackdrop.remove(); 
    }
    document.body.classList.remove('add-password-modal-open');
}

// Function to toggle password visibility in the modal
function toggleModalPasswordVisibility(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const toggleButton = passwordInput.nextElementSibling;

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.textContent = "Hide"; 
    } else {
        passwordInput.type = "password";
        toggleButton.textContent = "Show";
    }
}

// Function to invoke password generation and fill the fields
function fillGeneratedPassword() {
    const passwordInput = document.getElementById('websitePassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const generatedPassword = generatePassword(14); 
    passwordInput.value = generatedPassword;
    confirmPasswordInput.value = generatedPassword;

    updatePasswordStrength(passwordInput.value);
}
