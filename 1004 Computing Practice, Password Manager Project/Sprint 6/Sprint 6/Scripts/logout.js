// JavaScript source code
// logout.js

// Function to log out the user
function logout() {

    // Clear displayed user data
    const dataDisplayContainer = document.getElementById('dataDisplayContainer');
    if (dataDisplayContainer) {
        dataDisplayContainer.innerHTML = '';
    }

    exportUserData(); 

    // Clear user data and session storage
    userdata = [];
    sessionStorage.removeItem('masterPassword');

    // Remove any existing modals
    removeLoginModal();
    removeRegisterModal();

    // Reinitialize the login form/modal for subsequent login attempts
    createLoginForm();

    // Display a logout success message, if applicable
    const loginNotification = document.getElementById('loginNotification');
    if (loginNotification) {
        loginNotification.innerText = 'Logged out successfully.';
        loginNotification.style.display = 'block';

        setTimeout(() => {
            loginNotification.style.display = 'none';
        }, 3000);
    }
}

// Function to remove the login modal 
function showLoginModal() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const loginModal = document.querySelector('.modal');

    if (modalBackdrop && loginModal) {
        modalBackdrop.style.display = 'flex';
        loginModal.style.display = 'block'; 
    } else {
        createLoginForm();
    }
}