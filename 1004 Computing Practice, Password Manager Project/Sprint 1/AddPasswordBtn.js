document.addEventListener('DOMContentLoaded', function () {
    const addPasswordBtn = document.querySelector('.addPasswordBtn');
    const content = document.querySelector('.content');

    // Variable to keep track of the opened password page
    let isOpen = false;

    addPasswordBtn.addEventListener('click', function () {
        // Check if a password page is already open
        if (!isOpen) {
            // Set the flag to true to indicate that a password page is open
            isOpen = true;

            // Create a new password page element
            const passwordPage = document.createElement('div');
            passwordPage.classList.add('password-page');
            passwordPage.innerHTML = `
                <h3>Add Password Page</h3>

                <label for="URL">URL:</label>
                <input type="text" id="URL" name="URL">

                <label for="name">Name:</label>
                <input type="text" id="name" name="name">

                <label for="username">Username:</label>
                <input type="text" id="username" name="username">

                <label for="password">Password:</label>
                <input type="password" id="password" name="password">

                <button class="saveBtn">Save</button>
                <button class="closeBtn">Close</button>
            `;

            // Append the new page to the content area
            content.appendChild(passwordPage);

            // Add event listeners for the save and close buttons
            const saveBtn = passwordPage.querySelector('.saveBtn');
            const closeBtn = passwordPage.querySelector('.closeBtn');

            saveBtn.addEventListener('click', function () {
                // Handle save functionality (you can customize this part)
                console.log('Save button clicked');
                closePasswordPage();
            });

            closeBtn.addEventListener('click', function () {
                // Remove the password page when close button is clicked
                closePasswordPage();
            });

            // Function to close the password page
            function closePasswordPage() {
                content.removeChild(passwordPage);
                // Reset the flag to indicate that no password page is open
                isOpen = false;
            }
        }
    });
});