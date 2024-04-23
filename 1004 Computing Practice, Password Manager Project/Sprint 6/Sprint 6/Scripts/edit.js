// JavaScript source code
// edit.js

function openEditForm(entry, container) {
    if (document.querySelector('.edit-form-modal')) return;

    // Create modal elements
    const editmodal = document.createElement('div');
    editmodal.className = 'edit-form-modal';

    const editoverlay = document.createElement('div');
    editoverlay.className = 'edit-modal-overlay';
    editoverlay.addEventListener('click', () => closeEditForm(editmodal, editoverlay, container));

    // Create and setup the form
    const form = document.createElement('form');
    form.className = 'edit-form';
    form.id = 'editPasswordForm';

    // Prevent form from closing modal on click
    form.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Calculate initial password strength for the current password
    const passwordStrength = evaluatePasswordStrength(entry.website.credentials.password);

    form.innerHTML = `
        <div class="form-group">
        <div class="form-title-container">
            <h2 class="edit-form-title">Edit Password</h2>
            <button type="button" id="close-edit-button" class="form-btn close-edit-btn">Close</button>
        </div>

        <div class="form-group">
            <label for="editName" class="form-label">Name:</label>
            <input type="text" id="editName" name="name" value="${entry.website.name}" class="form-input">
        </div>
        <div class="form-group">
            <label for="editURL" class="form-label">URL:</label>
            <input type="text" id="editURL" name="url" value="${entry.website.url || ''}" class="form-input">
        </div>
        <div class="form-group">
            <label for="editUsername" class="form-label">Username:</label>
            <input type="text" id="editUsername" name="username" value="${entry.website.credentials.username || ''}" class="form-input">
        </div>
        <div class="form-group password-group">
            <label for="editPasswordInput" class="form-label">Password:</label>
            <input type="password" id="editPasswordInput" name="password" value="${entry.website.credentials.password || ''}" class="form-input password-input">
            <button type="button" id="edit-showPassword-button" class="toggle-password-visibility" onclick="toggleEditPasswordVisibility()">Show Password</button>
            <button type="button" id="edit-generate-button" class="edit-generate-password" onclick="EditgeneratePassword(document.getElementById('editPasswordInput'))">Generate Password</button>
            <div class="password-strength-container">
                <div id="editPasswordStrengthbar" class="password-strength-bar" style="background-color: ${passwordStrength.color};"></div>
                <p class="password-strength">Password Strength: <span id="editPasswordStrengthDisplay" class="password-strength-indicator">${passwordStrength.label}</span></p>
            </div>
        </div>
        <div class="form-actions">
            <button type="submit" class="form-btn save-changes-btn">Save Changes</button>
            <button type="button" class="form-btn delete-entry-btn" id="deleteEntry">Delete Entry</button>
        </div>
    `;

    editmodal.appendChild(form);
    container.appendChild(editmodal);
    container.appendChild(editoverlay);

    // Update the password strength display on click
    document.getElementById('editPasswordInput').addEventListener('input', function () {
        updatePasswordStrengthDisplay(this.value);
    });

    // Define the form submission handler within the openEditForm to properly scope variables
    form.onsubmit = function (e) {
        e.preventDefault();

        // Logic to find and update the entry in userdata
        const entryIndex = userdata.findIndex(uEntry => uEntry.website.id === entry.website.id);
        if (entryIndex !== -1) {
            userdata[entryIndex].website.name = document.getElementById('editName').value;
            userdata[entryIndex].website.url = document.getElementById('editURL').value;
            userdata[entryIndex].website.credentials.username = document.getElementById('editUsername').value;
            userdata[entryIndex].website.credentials.password = document.getElementById('editPasswordInput').value;

            displayUserData(userdata);
            closeEditForm(editmodal, editoverlay, container);
        }
    };

    // Delete entry button event listener
    document.getElementById('deleteEntry').addEventListener('click', () => deleteEntry(entry.website.id));

    document.getElementById('close-edit-button').addEventListener('click', () => closeEditForm(editmodal, editoverlay, container));
    function closeEditForm(modal, overlay, container) {
        container.removeChild(modal);
        container.removeChild(overlay);
    }
}


// Function to toggle password visibility in the edit form
function toggleEditPasswordVisibility() {
    var editPasswordInput = document.getElementById('editPasswordInput');
    var toggleBtn = document.getElementById('edit-showPassword-button');


    if (editPasswordInput.type === "password") {
        editPasswordInput.type = "text";
        toggleBtn.textContent = "Hide Password"; 
    } else {
        editPasswordInput.type = "password";
        toggleBtn.textContent = "Show Password"; 
    }
}


// Function to generate a random password and update the display
function EditgeneratePassword(editPasswordInput) {
    const password = generatePassword(12);
    editPasswordInput.value = password; 
    updatePasswordStrengthDisplay(password); 
}

// Function to generate a random password
function generatePassword() {
    const length = Math.floor(Math.random() * 5) + 12; 

    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
    let password = "";
    for (let i = 0; i < length; ++i) {
        let randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// Updates the password strength display and bar
function updatePasswordStrengthDisplay(password) {
    const strengthDisplay = document.getElementById('editPasswordStrengthDisplay'); 
    const strengthBar = document.getElementById('editPasswordStrengthbar'); 
    if (!strengthBar) {
        alert('Strength bar element not found');
        return;
    }
    const { label, color } = evaluatePasswordStrength(password);

    strengthDisplay.textContent = label;
    strengthBar.style.backgroundColor = color; 
}

// Function to delete an entry
function deleteEntry(entryId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const entryIndex = userdata.findIndex(entry => entry.website.id === entryId);
            if (entryIndex > -1) {
                userdata.splice(entryIndex, 1);
                displayUserData(userdata);
                Swal.fire(
                    'Deleted!',
                    'Your entry has been deleted.',
                    'success'
                );
            } else {
                console.error("Entry not found");
                alert("Entry not found. Could not delete.");
            }
        }
    });
}
