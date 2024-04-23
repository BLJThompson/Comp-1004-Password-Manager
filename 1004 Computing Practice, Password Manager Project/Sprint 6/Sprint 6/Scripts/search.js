// JavaScript source code
// search.js

// id = searchInput

function searchAndDisplayResults(query) {
    if (query.trim() === "") {
        // If query is empty, display all userData
        displayUserData(userdata);
    } else {
        // Otherwise, filter userData based on the query
        const filteredData = userdata.filter(item => {
            const nameMatch = item.website.name.toLowerCase().includes(query.toLowerCase());
            const urlMatch = item.website.url.toLowerCase().includes(query.toLowerCase());
            const usernameMatch = item.website.credentials.username.toLowerCase().includes(query.toLowerCase());
            return nameMatch || urlMatch || usernameMatch;
        });

        // Update the display with the filtered data
        searchdisplayUserData(filteredData);
    }
}

// Function to display search results
function searchdisplayUserData(filteredData) {

    const displayContainer = document.getElementById('dataDisplayContainer');
    displayContainer.innerHTML = ''; 

    if (filteredData.length === 0) {
        displayContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    filteredData.forEach(entry => {
        const passwordStrength = evaluatePasswordStrength(entry.website.credentials.password);

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
                    <td class="addPasswordInput">${'*'.repeat(entry.website.credentials.password.length)}</td>
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
                    <th>ID: ${entry.website.id}</th>
                    <td></td>
                    <th>Password Strength: </th>
                    <td>${passwordStrength.label}</td>
                    <td><button class="edit-entry">Edit Entry</button></td>
                </tr>
            </table>
        `;

        displayContainer.appendChild(userDataTable);

        // Attach event listeners
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



