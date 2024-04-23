// JavaScript source code
// index.js

// Function to display user data
function displayUserData(userData) {
    const userDataDiv = document.getElementById('userData');
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

        // Sprint 4 - Call the calculate password strength
        const passwordStrength = evaluatePasswordStrength(website.website.credentials.password);

        websiteDiv.innerHTML = `
            <h2>${website.website.name || 'N/A'}</h2>
            <p>ID: ${website.website.id || 'N/A'}</p>
            <p>URL: ${website.website.url || 'N/A'}</p>
            <p>Username: ${website.website.credentials.username || 'N/A'}</p>
            <p>Password: <span class="password-dots">${'*'.repeat(website.website.credentials.password.length)}</span><span class="password-text" style="display:none">${website.website.credentials.password || 'N/A'}</span></p>
            <p>Password Strength: ${passwordStrength}</p>
        `;
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
    if (parentDiv.querySelector('.edit-form')) return;
    // Disable all edit buttons while editing
    disableEditButtons(true); 

    // Create and setup the form
    const form = document.createElement('form');
    form.className = 'edit-form';

    // Calculate initial password strength for the current password
    const initialPasswordStrength = evaluatePasswordStrength(website.website.credentials.password);

    // Create the form elements
    form.innerHTML = `
        <div>
            <label for="editName">Website Name:</label>
            <input type="text" id="editName" name="name" value="${website.website.name || ''}" placeholder="Website Name">
        </div>
        <div>
            <label for="editUrl">Website URL:</label>
            <input type="text" id="editUrl" name="url" value="${website.website.url || ''}" placeholder="Website URL">
        </div>
        <div>
            <label for="editUsername">Username:</label>
            <input type="text" id="editUsername" name="username" value="${website.website.credentials.username || ''}" placeholder="Username">
        </div>
        <div>
            <label for="editPasswordInput">Password:</label>
            <div class="password-input">
                <input type="password" id="editPasswordInput" name="password" value="${website.website.credentials.password || ''}" placeholder="">
                <button type="button" onclick="toggleEditPasswordVisibility(document.getElementById('editPasswordInput'))">Show</button>
                <button type="button" onclick="EditgeneratePassword(document.getElementById('editPasswordInput'))">Generate Password</button>
            </div>
            <p>Password Strength: <span id="editPasswordStrengthDisplay">${initialPasswordStrength}</span></p>
        </div>
        <div>
            <button type="submit">Save Changes</button>
            <button type="button" onclick="cancelEditForm(form)">Cancel</button>
        </div>
    `;
    parentDiv.appendChild(form);

    // Add an event listener to the password input for real-time strength updates
    const editPasswordInput = document.getElementById('editPasswordInput');
    editPasswordInput.addEventListener('input', function () {
        const strength = evaluatePasswordStrength(this.value);
        document.getElementById("editPasswordStrengthDisplay").textContent = strength;
    });

    // Handle form submission
    form.onsubmit = function (event) {
        event.preventDefault();

        const updatedWebsiteData = {
            website: {
                id: website.website.id,
                name: form.elements["name"].value,
                url: form.elements["url"].value,
                credentials: {
                    username: form.elements["username"].value,
                    password: form.elements["password"].value,
                }
            }
        };

        // Find and update the website data in userData
        const websiteIndex = userData.findIndex(w => w.website.id === website.website.id);
        if (websiteIndex !== -1) {
            userData[websiteIndex] = updatedWebsiteData;
        }
        // update the displayed user data
        displayUserData(userData);

        disableEditButtons(false);
        form.remove();
    };
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

// Edit from password generator function
function EditgeneratePassword(passwordInput) {
    const newPassword = generatePassword(12);
    passwordInput.value = newPassword;

    // Update the password strength display
    const strengthDisplay = document.getElementById('editPasswordStrengthDisplay');
    const strength = evaluatePasswordStrength(newPassword);
    strengthDisplay.textContent = strength;
}

// Function to disable all edit buttons
function disableEditButtons(disable) {
    const editButtons = document.querySelectorAll('.edit-entry');
    editButtons.forEach(button => {
        button.disabled = disable;
    });
}
// Function to cancel the edit form
function cancelEditForm(formElement) {
    disableEditButtons(false);
    formElement.remove();
}
// Function to evaluate password strength
function evaluatePasswordStrength(password) {
    // Calculate the password strength based on the criteria
    let strength = 0;
    const criteria = [
        { regex: /[a-z]/ },
        { regex: /[A-Z]/ },
        { regex: /[0-9]/ },
        { regex: /[^A-Za-z0-9]/ },
        { length: 12 }
    ];
    // Check each criterion and increment the strength for each criterion met   
    criteria.forEach(criterion => {
        if (criterion.regex && criterion.regex.test(password)) {
            strength++;
        } else if (criterion.length && password.length >= criterion.length) {
            strength++;
        }
    });
    // Return the strength level
    switch (strength) {
        case 0:
            return 'No Password'
        case 1:
            return 'Very Weak';
        case 2:
            return 'Weak';
        case 3:
            return 'Moderate';
        case 4:
            return 'Strong';
        case 5:
            return 'Very Strong';
        default:
            return 'N/A';
    }
}