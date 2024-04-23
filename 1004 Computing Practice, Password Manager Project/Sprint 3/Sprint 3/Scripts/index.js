// JavaScript source code
// index.js

// Function to display user data
function displayUserData(userData) {
    const userDataDiv = document.getElementById('userData');

    // Clear previous content
    userDataDiv.innerHTML = '';

    // Loop through each website object in the array
    userData.forEach((website) => {
        const websiteDiv = document.createElement('div');
        websiteDiv.classList.add('website-info');

        // Create a button to show/hide the password
        const showPasswordButton = document.createElement('button');
        showPasswordButton.innerText = 'Show Password';
        showPasswordButton.addEventListener('click', function () {
            togglePasswordVisibility(websiteDiv);
        });

        // Create a button to edit the entry
        const editButton = document.createElement('button');
        editButton.classList.add('edit-entry');
        editButton.innerText = "Edit";
        editButton.addEventListener('click', function () {
            openEditForm(website, websiteDiv);
        });

        websiteDiv.innerHTML = `
            <h2>${website.website.name || 'N/A'}</h2>
            <p>ID: ${website.website.id || 'N/A'}</p>
            <p>URL: ${website.website.url || 'N/A'}</p>
            <p>Username: ${website.website.credentials.username || 'N/A'}</p>
            <p>Password: <span class="password-dots">${'*'.repeat(website.website.credentials.password.length)}</span><span class="password-text" style="display:none">${website.website.credentials.password || 'N/A'}</span></p>
        `;
        // Append the buttons to the websiteDiv
        websiteDiv.appendChild(showPasswordButton);
        websiteDiv.appendChild(editButton);
        userDataDiv.appendChild(websiteDiv);
    });
}

// Function to toggle password visibility
function togglePasswordVisibility(websiteDiv) {
    const passwordDots = websiteDiv.querySelector('.password-dots');
    const passwordText = websiteDiv.querySelector('.password-text');

    if (passwordDots.style.display === 'none') {
        passwordDots.style.display = 'inline';
        passwordText.style.display = 'none';
    } else {
        passwordDots.style.display = 'none';
        passwordText.style.display = 'inline';
    }
}

// Function to open the edit form
function openEditForm(website, parentDiv) {
    if (parentDiv.querySelector('form')) return;

    // Disable all edit buttons while editing
    disableEditButtons(true);

    // Create a form elements
    const form = document.createElement('form');
    form.className = 'edit-form';
    form.innerHTML = `
        <div>
            <input type="text" name="name" value="${website.website.name || ''}" placeholder="Website Name">
        </div>
        <div>
            <input type="text" name="url" value="${website.website.url || ''}" placeholder="Website URL">
        </div>
        <div>
            <input type="text" name="username" value="${website.website.credentials.username || ''}" placeholder="Username">
        </div>
        <div class="password-input">
            <input type="password" name="password" value="${website.website.credentials.password || ''}" placeholder="Password">
            <button type="button" onclick="toggleEditPasswordVisibility(this.previousElementSibling)">Show</button>
            <button type="button" onclick="generateAndFillPassword(this.previousElementSibling.previousElementSibling)">Generate Password</button>
        </div>
        <div>
            <button type="submit">Save Changes</button>
            <button type="button" onclick="cancelEditForm(this.form)">Cancel</button>
        </div>
    `;
    // Handle form submission
    form.onsubmit = function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const updatedWebsiteData = {
            website: {
                id: website.website.id,
                name: formData.get('name'),
                url: formData.get('url'),
                credentials: {
                    username: formData.get('username'),
                    password: formData.get('password'),
                }
            }
        };
        // Re-enable all edit buttons
        disableEditButtons(false);
        form.remove();

        // Update the specific entry in userData
        const websiteIndex = userData.findIndex(w => w.website.id === website.website.id);
        if (websiteIndex !== -1) {
            userData[websiteIndex] = updatedWebsiteData;
        }
        // Update the display
        displayUserData(userData);

        // Try to remove the form
        form.remove();
    };
    parentDiv.appendChild(form);
}

// Function to toggle password visibility in the edit form
function toggleEditPasswordVisibility(passwordInput) {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordInput.nextElementSibling.innerText = "Hide";
    } else {
        passwordInput.type = "password";
        passwordInput.nextElementSibling.innerText = "Show";
    }
}
// Function to generate a random password
function generateAndFillPassword(passwordInput) {
    const newPassword = generatePassword(12);
    passwordInput.value = newPassword;
}
// Function to disable/enable all edit buttons
function disableEditButtons(disable) {
    const editButtons = document.querySelectorAll('.edit-entry');
    editButtons.forEach(button => {
        button.disabled = disable;
    });
}
// Function to cancel the edit form
function cancelEditForm(form) {
    disableEditButtons(false); // Re-enable all edit buttons
    form.remove(); // Remove the current edit form
}
