// JavaScript source code
// register.js

// Function to create the registration form
function createRegisterForm() {

    removeRegisterModal();

    // Create a new modal backdrop
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'register-modal-backdrop';
    document.body.appendChild(modalBackdrop);

    // Create and append the register modal
    const modal = document.createElement('div');
    modal.className = 'register-modal';
    modal.innerHTML = `
        <form id="registerForm" class="register-form">
            <div id="registerNotification" class="register-notification"></div>
            <input type="password" id="password" placeholder="Enter a master password"" required>
            <button class="register-button" type="submit">Register</button>
            <button class="back-button" type="button" onclick="backtologin()">Back to Login</button>
        </form>
    `;

    modalBackdrop.appendChild(modal);

    // Set up form submission handling
    document.getElementById('registerForm').addEventListener('submit', handleRegisterFormSubmit);
    modalBackdrop.style.display = 'flex';
}

// Function to handle the registration form submission
async function handleRegisterFormSubmit(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;

    if (!password) {
        alert('Please enter a password');
        return;
    }

    // store the password in session storage
    sessionStorage.setItem('password', password);
    // console log the sessin storage password
    //console.log(sessionStorage.getItem('password'));

    try {
        // Creates new key and creates new user data and secure notes data
        const key = await getPasswordKey(password);  
        localStorage.setItem('userKey', JSON.stringify(key));  
        localStorage.setItem('userData', JSON.stringify([]));   
        localStorage.setItem('secureNotesData', JSON.stringify([])); 

        removeRegisterModal();
        displayUserData([]);
        displaySecureNotes([]);

    } catch (error) {
        alert("Registration failed: " + error.message);
    }
}


// Function to go back to login form
function backtologin() {
    removeRegisterModal();
    createLoginForm();
}

// Function to remove the regigster modal
function removeRegisterModal() {
    const registerModalBackdrop = document.querySelector('.register-modal-backdrop');
    if (registerModalBackdrop) {
        registerModalBackdrop.remove();
    }
}