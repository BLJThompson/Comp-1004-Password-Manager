// JavaScript source code
document.addEventListener('DOMContentLoaded', function () {
    const passwordPageContainer = document.querySelector('.password-page-container');
    const overlay = document.querySelector('.overlay');

    const saveBtn = passwordPageContainer.querySelector('.saveBtn');
    const closeBtn = passwordPageContainer.querySelector('.closeBtn');

    saveBtn.addEventListener('click', function () {
        // Handle save functionality (customize this part)
        console.log('Save button clicked');
    });

    closeBtn.addEventListener('click', function () {
        // Remove the password page when close button is clicked
        passwordPageContainer.classList.remove('show-password-page');
        overlay.classList.remove('overlay-visible');
    });
});