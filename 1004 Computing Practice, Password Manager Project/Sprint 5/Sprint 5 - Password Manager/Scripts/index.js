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

        const showPasswordButton = document.createElement('button');
        showPasswordButton.innerText = 'Show Password';
        showPasswordButton.classList.add('show-password');
        showPasswordButton.addEventListener('click', function () {
            togglePasswordVisibility(websiteDiv);
        });

        const editButton = document.createElement('button');
        editButton.classList.add('edit-entry');
        editButton.innerText = "Edit";
        editButton.addEventListener('click', function () {
            openEditForm(website, websiteDiv);
        });

        // delete entry function 
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-entry');
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener('click', function () {
            deleteEntry(website.website.id);
        });

        const passwordStrength = evaluatePasswordStrength(website.website.credentials.password);

        //<p>: ${website.website.id || 'N/A'}</p>

        websiteDiv.innerHTML = `
        <h2>${website.website.name || 'N/A'}</h2>

        <p class="website-url">URL: <span class="url-content">${website.website.url || 'N/A'}</span></p>
        <p class="website-username">Username: ${website.website.credentials.username || 'N/A'}</p>
        <p class="website-password">Password: <span class="password-dots">${'*'.repeat(website.website.credentials.password.length)}</span><span class="password-text" style="display:none">${website.website.credentials.password || 'N/A'}</span></p>
        <p class="website-password-strength">Password Strength: ${passwordStrength}</p>
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

function openEditForm(website, parentDiv) {
    // Ensure the form is only added once
    if (parentDiv.querySelector('.edit-form')) return;
    disableEditButtons(true); 

    // Create and setup the form
    const form = document.createElement('form');
    form.className = 'edit-form';
    const initialPasswordStrength = evaluatePasswordStrength(website.website.credentials.password);

    // Setup the form HTML, including placeholders for all website details
    form.innerHTML = `
    <div class="form-group">
        <label for="editName" class="form-label">Website Name:</label>
        <input type="text" id="editName" name="name" value="${website.website.name || ''}" placeholder="Website Name" class="form-input">
        <p>Website ID: ${website.website.id || 'N/A'}</p>
    </div>
    <div class="form-group">
        <label for="editUrl" class="form-label">Website URL:</label>
        <input type="text" id="editUrl" name="url" value="${website.website.url || ''}" placeholder="Website URL" class="form-input">
    </div>
    <div class="form-group">
        <label for="editUsername" class="form-label">Username:</label>
        <input type="text" id="editUsername" name="username" value="${website.website.credentials.username || ''}" placeholder="Username" class="form-input">
    </div>
    <div class="form-group password-group">
        <label for="editPasswordInput" class="form-label">Password:</label>
        <div class="password-input-container">
            <input type="password" id="editPasswordInput" name="password" value="${website.website.credentials.password || ''}" placeholder="Password" class="form-input password-input">
            <button type="button" class="toggle-password-visibility" onclick="toggleEditPasswordVisibility(document.getElementById('editPasswordInput'))">Show</button>
            <button type="button" class="edit-generate-password" onclick="EditgeneratePassword(document.getElementById('editPasswordInput'))">Generate Password</button>
        </div>
        <p class="password-strength">Password Strength: <span id="editPasswordStrengthDisplay" class="password-strength-indicator">${initialPasswordStrength}</span></p>
    </div>
    <div class="form-actions">
        <button type="submit" class="save-changes">Save Changes</button>
        <button type="button" class="delete-entry" onclick="deleteEntry(${website.website.id})">Delete Entry</button>
        <button type="button" class="cancel-edit" onclick="cancelEditForm(form)">Cancel</button>
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
        // Redisplay all user data with the updated entry
        displayUserData(userData); 
        // Re-enable edit buttons
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
    let strength = 0;
    const criteria = [
        { regex: /[a-z]/ },
        { regex: /[A-Z]/ },
        { regex: /[0-9]/ },
        { regex: /[^A-Za-z0-9]/ },
        { length: 12 }
    ];

    criteria.forEach(criterion => {
        if (criterion.regex && criterion.regex.test(password)) {
            strength++;
        } else if (criterion.length && password.length >= criterion.length) {
            strength++;
        }
    });

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

// Delete an entry
function deleteEntry(websiteId) {
    const entryIndex = userData.findIndex(entry => entry.website.id === websiteId);

    if (entryIndex > -1) {
        userData.splice(entryIndex, 1);
        displayUserData(userData);
        console.log("Entry deleted successfully.");
    } else {
        console.log("Entry not found");
    }
}
