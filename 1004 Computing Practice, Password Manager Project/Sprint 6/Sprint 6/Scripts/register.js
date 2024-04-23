// Javascript file for the register modal
// register.js

function showRegisterModal() {
    // Hide or remove the login modal backdrop
    const loginModalBackdrop = document.querySelector('.login-modal-backdrop');
    if (loginModalBackdrop) {
        loginModalBackdrop.remove();
    }

    // Remove existing register modal backdrop if it exists
    const existingBackdrop = document.querySelector('.register-modal-backdrop');
    if (existingBackdrop) {
        existingBackdrop.remove();
    }

    // Create a new register modal backdrop
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'register-modal-backdrop';
    document.body.appendChild(modalBackdrop);

    // Create and append the register modal
    const registerModal = document.createElement('div');
    registerModal.className = 'register-modal';
    registerModal.innerHTML = `
        <div class="modal-content">
            <form id="registerForm" class="register-form">
                <h2>Register</h2>
                <input type="password" id="masterPassword" class="register-input" placeholder="Master Password" required><br>
                <input type="password" id="confirmMasterPassword" class="register-input" placeholder="Confirm Master Password" required><br>
                <button class="register-button" type="button" onclick="createMasterPassword()">Create</button>
                <button class="close-register-button" type="button" onclick="closeregistermodalbutton()">Close</button>
            </form>
        </div>
    `;

    modalBackdrop.appendChild(registerModal);
    modalBackdrop.style.display = 'flex';

}

// Function to create the master password
function createMasterPassword() {
    const masterPassword = document.getElementById('masterPassword').value;
    const confirmMasterPassword = document.getElementById('confirmMasterPassword').value;

    if (masterPassword === confirmMasterPassword) {
        sessionStorage.setItem('masterPassword', masterPassword);
        userdata = []; 

        closeRegisterModal();
        openDatabaseUI();
    } else {
        alert('Passwords do not match.');
    }
}



// Function to close the register modal
function closeRegisterModal() {
    const registerModalBackdrop = document.querySelector('.register-modal-backdrop');
    if (registerModalBackdrop) {
        registerModalBackdrop.remove();
    }
}

// Function to show the database UI after registration
function openDatabaseUI() {
    const databaseUI = document.getElementById('dataManagementContainer');
    if (databaseUI) {
        databaseUI.style.display = 'block';
    }
}
// Function to show the login modal after pressing the close button
function closeregistermodalbutton() {
    closeRegisterModal();
    showLoginForm();
}

// Function to remove the register modal
function removeRegisterModal() {
    const registerModalBackdrop = document.querySelector('.register-modal-backdrop');
    if (registerModalBackdrop) {
        registerModalBackdrop.remove();
    }
}