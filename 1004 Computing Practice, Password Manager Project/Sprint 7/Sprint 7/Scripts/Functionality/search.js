// JavaScript source code
// search.js

// Functiion to search and display results
function searchAndDisplayResults(query) {
    query = query.trim().toLowerCase();
    if (!query) {
        displayUserData(userData);
        displaySecureNotes(secureNotesData);
        return;
    }
    // Filter the data based on the query
    const filteredData = userData.filter(item => {
        const nameMatch = item.website.name.toLowerCase().includes(query);
        const urlMatch = item.website.url.toLowerCase().includes(query);
        const usernameMatch = item.website.credentials.username.toLowerCase().includes(query);
        return nameMatch || urlMatch || usernameMatch;
    });
    // Filter the secure notes data based on the query
    const filteredSecureNotesData = secureNotesData.filter(note => {
        const secNameMatch = note.secureNote.SecName.toLowerCase().includes(query);
        return secNameMatch;
    });
    // Display the filtered data
    searchdisplayUserData(filteredData);
    searchdisplaySecureNotes(filteredSecureNotesData);
    // Display a message if no results are found
    if (filteredData.length === 0 && filteredSecureNotesData.length === 0) {
        const displayContainer = document.getElementById('dataDisplayContainer');
        displayContainer.innerHTML = '<p>No results found.</p>';
    }

}


// Function to display the user data
function searchdisplayUserData(filteredData) {

    const displayContainer = document.getElementById('dataDisplayContainer');
    displayContainer.innerHTML = ''; 

    filteredData.forEach(entry => {
        const passwordStrength = evaluatePasswordStrength(entry.website.credentials.userpassword);

        const userDataTable = document.createElement('table');
        userDataTable.className = 'userdatatb';

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

        displayContainer.appendChild(userDataTable);

        const togglePasswordButton = userDataTable.querySelector('.toggle-password');
        togglePasswordButton.addEventListener('click', () => {
            togglePasswordVisibility(entry, userDataTable);
        });

        const editButton = userDataTable.querySelector('.edit-entry');
        editButton.addEventListener('click', () => {
            openEditForm(entry, userDataTable);
        });
    });
}
// Function to display the secure notes
function searchdisplaySecureNotes(filteredSecureNotesData) {
    const notesContainer = document.getElementById('secureNotesDisplay');
    notesContainer.innerHTML = ''; 

    filteredSecureNotesData.forEach(note => {
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
        notesContainer.appendChild(noteDiv);

        const toggleNoteButton = noteDiv.querySelector('.toggle-note-btn');
        const noteDetails = noteDiv.querySelector('.note-details');
        const editButton = noteDiv.querySelector('.edit-note-btn');

        toggleNoteButton.onclick = () => {
            if (noteDetails.style.display === 'none') {
                noteDetails.style.display = 'block';
                toggleNoteButton.textContent = 'Hide Details';
            } else {
                noteDetails.style.display = 'none';
                toggleNoteButton.textContent = 'Show Details';
            }
        };

        editButton.addEventListener('click', () => {
            openEditSecureNoteForm(note, notesContainer);
        });
    });
}
