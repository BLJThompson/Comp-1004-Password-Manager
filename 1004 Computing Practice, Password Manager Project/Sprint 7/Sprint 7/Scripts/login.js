// JavaScript source code
// login.js

document.addEventListener('DOMContentLoaded', function () {
    // clear the session storage
    sessionStorage.clear();
    createLoginForm();
});

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
            <div id="loginNotification" class="login-notification"></div>
            <input type="file" id="fileInput" accept=".json" class="file-input" required>
            <input type="password" id="password" placeholder="Enter your master password" required>
            <button class="login-button" type="submit">Login</button>

            <div class="login-form-footer">
                <p class="account-query">Don't have an account?</p>
                <button class="register-button" type="button" onclick="showRegisterModal()">Register</button>
            </div>

        </form>
    `;
            //<button type="button" onclick="loadUnencryptedFile()">Load Unencrypted File</button>
    modalBackdrop.appendChild(modal);

    // Set up form submission handling
    document.getElementById('loginForm').addEventListener('submit', handleLoginFormSubmit);
    modalBackdrop.style.display = 'flex';
}
// Function to handle the login form submission
async function handleLoginFormSubmit(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file || !password) {
        showError('Please select a file and enter the password');
        return;
    }
    // store the password in session storage
    sessionStorage.setItem('password', password);

    try {
        const decryptedData = await decryptFile(file, password);
        const parsedData = JSON.parse(decryptedData);
        if (parsedData.entries && parsedData.secureNotes) {
            userData = parsedData.entries;
            secureNotesData = parsedData.secureNotes;
            displayUserData(userData);
            displaySecureNotes(secureNotesData);
            removeLoginModal();
        } else {
            throw new Error("Invalid file format. Expected 'entries' and 'secureNotes'.");
        }
    } catch (error) {
        showError(error.message);
    }
}
// Function to generate a key from a password
function getPasswordKey(password) {
    return window.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveKey"]
    );
}

// Function to derive an encryption key from a password key
function deriveKey(passwordKey, salt) {
    return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        passwordKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

// Decrypt the data from the file
async function decryptFile(file, password) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
            try {
                const encryptedData = JSON.parse(e.target.result);
                const decrypted = await decryptData(encryptedData, password);
                resolve(decrypted);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = () => {
            reject(new Error("Error reading file"));
        };
        reader.readAsText(file);
    });
}

// Decrypt data using the Web Crypto API
async function decryptData(encryptedData, password) {
    const { ciphertext, salt, iv } = encryptedData;
    try {
        const passwordKey = await getPasswordKey(password);
        const key = await deriveKey(passwordKey, new Uint8Array(salt));
        const decrypted = await window.crypto.subtle.decrypt(
            { name: "AES-GCM", iv: new Uint8Array(iv) },
            key,
            new Uint8Array(ciphertext)
        );
        return new TextDecoder().decode(decrypted);
    } catch (error) {
        throw new Error("Failed to decrypt. Check the password.");
    }
}

// Function to create the register form
function showRegisterModal() {
    removeLoginModal();
    createRegisterForm();
}
// Function to remove the login form
function removeLoginModal() {
    const loginModalBackdrop = document.querySelector('.login-modal-backdrop');
    if (loginModalBackdrop) {
        loginModalBackdrop.remove();
    }
}
// Function to show any error messages
function showError(message) {
    const notification = document.getElementById('loginNotification');
    notification.textContent = message;
    notification.style.color = 'red';
}
