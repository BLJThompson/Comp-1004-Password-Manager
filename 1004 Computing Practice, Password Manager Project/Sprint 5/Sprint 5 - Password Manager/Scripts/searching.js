// JavaScript source code

// Function to search and display results based on a query
function searchAndDisplayResults(query) {
    if (query.trim() === "") {
        // If query is empty, display all userData
        displayUserData(userData);
    } else {
        // Otherwise, filter userData based on the query
        const filteredData = userData.filter(item => {
            const nameMatch = item.website.name.toLowerCase().includes(query.toLowerCase());
            const urlMatch = item.website.url.toLowerCase().includes(query.toLowerCase());
            const usernameMatch = item.website.credentials.username.toLowerCase().includes(query.toLowerCase());
            return nameMatch || urlMatch || usernameMatch;
        });

        // Update the display with the filtered data
        searchdisplayUserData(filteredData);
    }
}

// Function to display user data or a 'no results' message
function searchdisplayUserData(filteredData) {
    const userDataDiv = document.getElementById('userData');
    userDataDiv.innerHTML = '';

    if (filteredData.length === 0) {
        userDataDiv.innerHTML = '<p class="searching-no-results">No matching results.</p>';
    } else {
        filteredData.forEach(item => {
            const websiteDiv = document.createElement('div');
            websiteDiv.classList.add('searching-website-info');

            // Dynamically create and append elements to display the website details
            const nameElement = document.createElement('h2');
            nameElement.classList.add('searching-website-name');
            nameElement.textContent = item.website.name;
            websiteDiv.appendChild(nameElement);

            const urlElement = document.createElement('p');
            urlElement.classList.add('searching-website-url');
            urlElement.textContent = `URL: ${item.website.url}`;
            websiteDiv.appendChild(urlElement);

            const usernameElement = document.createElement('p');
            usernameElement.classList.add('searching-website-username');
            usernameElement.textContent = `Username: ${item.website.credentials.username}`;
            websiteDiv.appendChild(usernameElement);

            // Password display setup
            const passwordElement = document.createElement('p');
            passwordElement.classList.add('searching-website-password');
            passwordElement.textContent = 'Password: ';
            const passwordSpan = document.createElement('span');
            passwordSpan.classList.add('searching-password-value');
            passwordSpan.textContent = '********'; 
            passwordElement.appendChild(passwordSpan);
            websiteDiv.appendChild(passwordElement);

            // Password strength
            const passwordStrengthElement = document.createElement('p');
            passwordStrengthElement.classList.add('searching-password-strength');
            passwordStrengthElement.textContent = `Password Strength: ${evaluatePasswordStrength(item.website.credentials.password)}`;
            websiteDiv.appendChild(passwordStrengthElement);

            // Show/Hide Password Button
            const showPasswordButton = document.createElement('button');
            showPasswordButton.classList.add('searching-show-password-button');
            showPasswordButton.textContent = 'Show Password';
            showPasswordButton.addEventListener('click', () => {
                if (showPasswordButton.textContent === 'Show Password') {
                    passwordSpan.textContent = item.website.credentials.password; 
                    showPasswordButton.textContent = 'Hide Password';
                } else {
                    passwordSpan.textContent = '********';
                    showPasswordButton.textContent = 'Show Password';
                }
            });

            // Create the Edit button
            const editButton = document.createElement('button');
            editButton.classList.add('searching-edit-button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', function () {
                openEditForm(item, websiteDiv);
            });

            // Append the buttons to the website div
            websiteDiv.appendChild(showPasswordButton);
            websiteDiv.appendChild(editButton);
            userDataDiv.appendChild(websiteDiv);
        });
    }
}