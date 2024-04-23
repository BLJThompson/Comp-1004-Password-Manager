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
        userDataDiv.innerHTML = '<p>No matching results.</p>';
    } else {
        filteredData.forEach(item => {
            // Create a div for each website
            const websiteDiv = document.createElement('div');
            websiteDiv.classList.add('website-info');

            const nameElement = document.createElement('h2');
            nameElement.textContent = item.website.name;
            websiteDiv.appendChild(nameElement);

            const idElement = document.createElement('p');
            idElement.textContent = `ID: ${item.website.id}`;
            websiteDiv.appendChild(idElement);

            const urlElement = document.createElement('p');
            urlElement.textContent = `URL: ${item.website.url}`;
            websiteDiv.appendChild(urlElement);

            const usernameElement = document.createElement('p');
            usernameElement.textContent = `Username: ${item.website.credentials.username}`;
            websiteDiv.appendChild(usernameElement);

            // Password display setup
            const passwordElement = document.createElement('p');
            passwordElement.textContent = 'Password: ';
            const passwordSpan = document.createElement('span');
            passwordSpan.textContent = '********';
            passwordElement.appendChild(passwordSpan);
            websiteDiv.appendChild(passwordElement);

            // Password strength
            const passwordStrengthElement = document.createElement('p');
            passwordStrengthElement.textContent = `Password Strength: ${evaluatePasswordStrength(item.website.credentials.password)}`;
            websiteDiv.appendChild(passwordStrengthElement);

            // Show/Hide Password Button
            const showPasswordButton = document.createElement('button');
            showPasswordButton.textContent = 'Show Password';
            showPasswordButton.addEventListener('click', () => {

                // Toggle between showing and hiding the password
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