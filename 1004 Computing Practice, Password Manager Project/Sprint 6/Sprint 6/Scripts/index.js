// JavaScript source code
// index.js


// To display the user data
function displayUserData(userdata) {
    const container = document.getElementById('dataDisplayContainer');
    container.innerHTML = ''; 

    userdata.forEach(entry => {
        // Create a table element
        const userDataTable = document.createElement('table');
        userDataTable.className = 'userdatatb';

        // Password strength calculation
        const passwordStrength = evaluatePasswordStrength(entry.website.credentials.password);

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

        //<th>ID: ${entry.website.id}</th>


        // Add event listeners for buttons within this table
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

// Function to toggle password visibility
function togglePasswordVisibility(entry, userDataTable) {
    const passwordCell = userDataTable.querySelector('.addPasswordInput');
    const toggleButton = userDataTable.querySelector('.toggle-password');

    if (passwordCell && toggleButton) {
        if (passwordCell.textContent.includes('*')) {
            passwordCell.textContent = entry.website.credentials.password; 
            toggleButton.textContent = 'Hide Password'; 
            passwordCell.classList.add('shown-password');
        } else {
            passwordCell.textContent = '*'.repeat(entry.website.credentials.password.length);
            toggleButton.textContent = 'Show Password';
            passwordCell.classList.remove('shown-password');
        }
    } else {
        console.error("Password cell or button not found in the table.");
    }
}



// Function to show password strength
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

    let strengthLabel;
    let strengthColor;
    switch (strength) {
        case 0:
            strengthLabel = 'No Password';
            strengthColor = 'grey'; 
            break;
        case 1:
            strengthLabel = 'Very Weak';
            strengthColor = 'red';
            break;
        case 2:
            strengthLabel = 'Weak';
            strengthColor = 'orange';
            break;
        case 3:
            strengthLabel = 'Moderate';
            strengthColor = 'yellow';
            break;
        case 4:
            strengthLabel = 'Strong';
            strengthColor = 'lightgreen';
            break;
        case 5:
            strengthLabel = 'Very Strong';
            strengthColor = 'green';
            break;
        default:
            strengthLabel = 'N/A';
            strengthColor = 'grey'; 
    }
    // Return both the label and the color as part of an object
    return { label: strengthLabel, color: strengthColor };
}