// JavaScript source code
// displaydata.js


// Function to display .password from session storage
function displayPassword() {
    const password = sessionStorage.getItem('password');
    if (password) {
        console.log('Master Password: ' + password);
    } else {
        console.log('Password not found in session storage');
    }
}

// To display the user data
function displayUserData(userData) {

    userdata = userData;

    const container = document.getElementById('dataDisplayContainer');
    container.innerHTML = ''; 

    userdata.forEach(entry => {
        // Create a table element
        const userDataTable = document.createElement('table');
        userDataTable.className = 'userdatatb';

        // Password strength calculation
        const passwordStrength = evaluatePasswordStrength(entry.website.credentials.userpassword);

        // Generate the table HTML content
        userDataTable.innerHTML = `
            <div class="userdata-website-header">
                <div class="userdata-website-name">${entry.website.name}</div>
            </div>
            <table class="user-data-table">
                <tr>
                    <th>URL:</th>
                    <td><a href="${entry.website.url}" target="_blank">${entry.website.url}</a></td>
                    <th>Password:</th>
                    <td class="addPasswordInput">${'*'.repeat(entry.website.credentials.userpassword.length)}</td>
                    <td><button class="toggle-password">Show Password</button></td>
                </tr>
                <tr>
                    <th>Username:</th>
                    <td>${entry.website.credentials.username}</td>
                    <td></td>
                    <td colspan="2"><div class="password-strength-bar" style="background-color: ${passwordStrength.color}; width: 200px; height: 10px;"></div></td>
                    <td></td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                    <th>Password Strength: </th>
                    <td>${passwordStrength.label}</td>
                    <td><button class="edit-entry">Edit Entry</button></td>
                </tr>
            </table>
        `;

        // Append the table to the container
        container.appendChild(userDataTable);
        const togglePasswordButton = userDataTable.querySelector('.toggle-password');
        togglePasswordButton.addEventListener('click', function () {
            togglePasswordVisibility(entry, userDataTable);
        });

        const editButton = userDataTable.querySelector('.edit-entry');
        editButton.addEventListener('click', function () {
            openEditForm(entry, userDataTable);
        });
    });
}

function togglePasswordVisibility(entry, userDataTable) {
    // Find the password cell within the table
    const passwordCell = userDataTable.querySelector('.addPasswordInput');
    // Find the button that triggered the function
    const toggleButton = userDataTable.querySelector('.toggle-password');

    if (passwordCell && toggleButton) {
        if (passwordCell.textContent.includes('*')) {
            passwordCell.textContent = entry.website.credentials.userpassword;
            toggleButton.textContent = 'Hide Password'; 
            passwordCell.classList.add('shown-password');
        } else {
            passwordCell.textContent = '*'.repeat(entry.website.credentials.userpassword.length);
            toggleButton.textContent = 'Show Password'; 
            passwordCell.classList.remove('shown-password');
        }
    } else {
        console.error("Password cell or button not found in the table.");
    }
}

// Function to display secure notes with edit functionality
function displaySecureNotes(secureNotesData) {
    const secContainer = document.getElementById('secureNotesDisplay');
    secContainer.innerHTML = '';  
    secureNotesData.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note-entry';
        noteDiv.innerHTML = `
        <h4>Secure Note: ${note.secureNote.SecName || 'N/A'}</h4>
        <div class="note-details" style="display: none;">
            <p>Note: ${note.secureNote.SecNote || 'N/A'}</p>
        </div>
        <button class="toggle-note-btn">Show Details</button>
        <button class="edit-note-btn">Edit</button>
    `;
        secContainer.appendChild(noteDiv);

        const toggleNoteButton = noteDiv.querySelector('.toggle-note-btn');
        const noteDetails = noteDiv.querySelector('.note-details');
        const editButton = noteDiv.querySelector('.edit-note-btn');

        toggleNoteButton.onclick = () => {
            if (noteDetails.style.display === 'none') {
                noteDetails.style.display = 'block';
                toggleNoteButton.textContent = 'Hide Note';
            } else {
                noteDetails.style.display = 'none';
                toggleNoteButton.textContent = 'Show Note';
            }
        };

        editButton.onclick = () => {
            openEditSecureNoteForm(note, secContainer);
        };
    });
}


// Function to show all items (both passwords and secure notes)
function showAllItems() {
    displayUserData(userData);
    displaySecureNotes(secureNotesData);
}

// Function to show only passwords
function showPasswords() {
    const passwordContainer = document.getElementById('dataDisplayContainer');
    const notesContainer = document.getElementById('secureNotesDisplay');
    notesContainer.innerHTML = '';
    displayUserData(userData);
}

// Function to show only secure notes
function showSecNotes() {
    const passwordContainer = document.getElementById('dataDisplayContainer');
    const notesContainer = document.getElementById('secureNotesDisplay');
    passwordContainer.innerHTML = '';
    displaySecureNotes(secureNotesData);
}
