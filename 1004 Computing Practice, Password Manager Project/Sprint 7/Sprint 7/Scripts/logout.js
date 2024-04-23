// JavaScript source code
// logout.js

// logout function
function logout() {

    // if session storage is empty, run exportUserData function, else run encryptAndDownload function
    if (sessionStorage.length === 0) {
        exportUserData();
        alert('Password required for encryption. Data exported unencrypted.');
    } else {
        encryptAndDownload();
    }

    // Remove the password from session storage
    sessionStorage.clear();

    // Clear the user data and secure notes
    userData = [];
    secureNotesData = [];

    // Update the display
    displayUserData(userData);
    displaySecureNotes(secureNotesData);
    createLoginForm();

    // Display a logout success message, if applicable
    const loginNotification = document.getElementById('loginNotification');
    if (loginNotification) {
        loginNotification.innerText = 'Logged out successfully.';
        loginNotification.style.display = 'block';

        setTimeout(() => {
            loginNotification.style.display = 'none';
        }, 5000);
    }
}

// Async function to encrypt data
async function encryptData(text, password) {
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const passwordKey = await getPasswordKey(password);
    const key = await deriveKey(passwordKey, salt);
    const encoded = new TextEncoder().encode(text);

    const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encoded
    );

    return {
        ciphertext: Array.from(new Uint8Array(encrypted)),
        salt: Array.from(salt),
        iv: Array.from(iv)
    };
}

// Function to handle the encrypted data download
async function encryptAndDownload() {
    const password = sessionStorage.getItem('password');
    // Check if the password is provided
    if (!password) {
        console.error('Password is required for encryption.');
        alert('Password is missing.');
        return;
    }

    const dataToEncrypt = JSON.stringify({
        entries: userData,
        secureNotes: secureNotesData
    });

    try {
        // Encrypt the data
        const encryptedData = await encryptData(dataToEncrypt, password);
        const blob = new Blob([JSON.stringify(encryptedData)], { type: 'application/json' });

        downloadDataWithDate(blob, "encrypted-user_data");

    } catch (error) {
        console.error('Error encrypting data:', error);
        alert('Failed to encrypt data. Please check the console for more details.');
    }
}






