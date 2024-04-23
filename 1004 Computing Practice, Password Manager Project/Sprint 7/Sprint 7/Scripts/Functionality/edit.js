// JavaScript source code
// edit.js

function openEditForm(websiteData, userDataDiv) {

    entry = websiteData;
    container = userDataDiv;
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
    const passwordStrength = evaluatePasswordStrength(entry.website.credentials.userpassword);

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
            <label for="editNote" class="form-label">Note:</label>
            <textarea id="editNote" name="note" class="form-input">${entry.website.websitenote || ''}</textarea>
        </div>

        <div class="form-group">
            <label for="editUsername" class="form-label">Username:</label>
            <input type="text" id="editUsername" name="username" value="${entry.website.credentials.username || ''}" class="form-input">
        </div>
        <div class="form-group password-group">
            <label for="editPasswordInput" class="form-label">Password:</label>
            <input type="password" id="editPasswordInput" name="password" value="${entry.website.credentials.userpassword || ''}" class="form-input password-input">

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

    document.getElementById('editPasswordInput').addEventListener('input', function () {
        updatePasswordStrengthDisplay(this.value);
    });

    form.onsubmit = function (e) {
        e.preventDefault();

        // Logic to find and update the entry in userdata
        const entryIndex = userData.findIndex(uEntry => uEntry.website.id === entry.website.id);
        if (entryIndex !== -1) {
            userData[entryIndex].website.name = document.getElementById('editName').value;
            userData[entryIndex].website.url = document.getElementById('editURL').value;
            userData[entryIndex].website.websitenote = document.getElementById('editNote').value;
            // if password was changed getdatetime to adjust timecreated
            if (entry.website.credentials.userpassword !== document.getElementById('editPasswordInput').value) {
                userData[entryIndex].website.timecreated = getDateTime();
            }
            userData[entryIndex].website.credentials.username = document.getElementById('editUsername').value;
            userData[entryIndex].website.credentials.userpassword = document.getElementById('editPasswordInput').value;



            // Reflect changes in the UI
            displayUserData(userData); 
            closeEditForm(editmodal, editoverlay, container); 
        }
    };

    document.getElementById('deleteEntry').addEventListener('click', () => deleteEntry(entry.website.id));
    document.getElementById('close-edit-button').addEventListener('click', () => closeEditForm(editmodal, editoverlay, container));
}

function closeEditForm(modal, overlay, container) {
    if (container.contains(modal)) {
        container.removeChild(modal);
    } else {
        console.error("Modal is not a child of the container.");
    }

    if (container.contains(overlay)) {
        container.removeChild(overlay);
    } else {
        console.error("Overlay is not a child of the container.");
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


// Updates the password strength display and bar
function updatePasswordStrengthDisplay(userpassword) {
    const strengthDisplay = document.getElementById('editPasswordStrengthDisplay');
    const strengthBar = document.getElementById('editPasswordStrengthbar');
    if (!strengthBar) {
        alert('Strength bar element not found');
        return;
    }
    const { label, color } = evaluatePasswordStrength(userpassword);

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
            const entryIndex = userData.findIndex(entry => entry.website.id === entryId);
            if (entryIndex > -1) {
                userData.splice(entryIndex, 1);
                displayUserData(userData);
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
