// JavaScript source code
// addMasterpassword.js


function showAddMasterPasswordModal() {
    const existingModal = document.querySelector('.master-password-modal-backdrop');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal elements
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'master-password-modal-backdrop';
    var masterPassword = sessionStorage.getItem('password');


    const modal = document.createElement('div');
    modal.className = 'master-password-modal';
    modal.innerHTML = `
    <div class="master-modal-content">
        <div class="modal-header">
            <h2>Master Password</h2>
            <button class="close-modal-btn" onclick="closeMasterPasswordModal()">&#10006;</button>
        </div>
        <p>Set a master password to secure your data.</p>
        <p>This password should be something you can easily remember but still long.</p>
        <input type="password" id="masterPasswordInput" placeholder="Master Password" />

        <button id="masterPasswordInput-toggle" class="toggle-show-btn" onclick="toggleMasterShowPassword('masterPasswordInput')">Show Password</button>
        <input type="password" id="confirmMasterPasswordInput" placeholder="Confirm Master Password" />

        <button id="confirmMasterPasswordInput-toggle" class="toggle-show-btn" onclick="toggleMasterShowPassword('confirmMasterPasswordInput')">Show Password</button>
        <button class="save-changes-btn" onclick="updateMasterPassword()">Save Changes</button>
    </div>
`;

    document.body.appendChild(modalBackdrop);
    modalBackdrop.appendChild(modal);

    // Set the value of the master password input field after appending the modal to the DOM
    var masterPasswordInput = document.getElementById('masterPasswordInput');
    var confirmMasterPasswordInput = document.getElementById('confirmMasterPasswordInput');
    if (masterPasswordInput, confirmMasterPasswordInput) {
        masterPasswordInput.value = masterPassword || ''; 
        confirmMasterPasswordInput.value = masterPassword || ''; 
    }

    // Display the modal
    modalBackdrop.style.display = 'flex';
}

// Function to toggle the visibility of master password in the modal
function toggleMasterShowPassword(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const toggleButton = document.getElementById(fieldId + '-toggle');

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.textContent = "Hide"; 
    } else {
        passwordInput.type = "password";
        toggleButton.textContent = "Show"; 
    }
}

// Function to update the master password in session storage after confirmation
function updateMasterPassword() {
    const newPassword = document.getElementById('masterPasswordInput').value;
    const confirmPassword = document.getElementById('confirmMasterPasswordInput').value;

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    if (newPassword) {
        sessionStorage.setItem('password', newPassword);
    } else {
        alert('Please enter a new password.');
    }
    closeMasterPasswordModal();
}

// Function to close the modal
function closeMasterPasswordModal() {
    const modalBackdrop = document.querySelector('.master-password-modal-backdrop');
    if (modalBackdrop) {
        modalBackdrop.remove(); 
    }
}
