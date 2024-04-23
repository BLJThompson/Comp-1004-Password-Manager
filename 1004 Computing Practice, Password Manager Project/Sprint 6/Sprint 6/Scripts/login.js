// JavaScript source code
// login.js

// this event listener will be triggered when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    createLoginForm();
});

// Function to create the login form
function createLoginForm() {
    // Remove existing login modal backdrop if it exists
    const existingBackdrop = document.querySelector('.login-modal-backdrop');
    if (existingBackdrop) {
        existingBackdrop.remove();
    }

    // Create a new modal backdrop
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'login-modal-backdrop';
    document.body.appendChild(modalBackdrop);

    // Create and append the login modal
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    modal.innerHTML = `
        <form id="loginForm" class="login-form">
            <div id="loginNotification" class="login-notification"></div> <!-- Notification placeholder -->
            <input type="file" id="fileInput" accept=".json" class="file-input" required>
            <input type="password" id="password" placeholder="Master Password" required>
            <button class="login-button" type="submit">Login</button>

            <div class="login-form-footer">
            <p class="account-query">Don't have an account? </p>
            <button class="register-button" type="button" onclick="showRegisterModal()">Register</button>
            </div>
        </form>
    `;

    modalBackdrop.appendChild(modal);

    // Set up form submission handling
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        login();
    });

    // Show the modal
    modalBackdrop.style.display = 'flex';
}

// Function to handle the login process
function login() {
    const fileInput = document.getElementById('fileInput').files[0];
    const inputPassword = document.getElementById('password').value;
    const modalBackdrop = document.querySelector('.login-modal-backdrop');

    if (!fileInput) {
        alert('Please select a file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = async function (e) { 
        const fileContent = JSON.parse(e.target.result);
        if (inputPassword === fileContent.masterPassword) {
            modalBackdrop.style.display = 'none';
            document.getElementById('searchContainer').style.display = 'block';

            console.log('Logged in successfully');
            userdata = fileContent.entries;

            // Store masterPassword securely in sessionStorage
            sessionStorage.setItem('masterPassword', fileContent.masterPassword);

            displayUserData(userdata);
        } else {
            alert('Invalid password');
        }
    };
    reader.onerror = function () {
        alert('Failed to read file');
    };
    reader.readAsText(fileInput);
}

// Function to show the login form
function showLoginForm() {
    createLoginForm();
    const modalBackdrop = document.querySelector('.login-modal-backdrop');
    if (modalBackdrop) {
        modalBackdrop.style.display = 'flex'; 
    }
}
// Function to remove the login modal
function removeLoginModal() {
    const loginModalBackdrop = document.querySelector('.login-modal-backdrop');
    if (loginModalBackdrop) {
        loginModalBackdrop.remove();
    }
}