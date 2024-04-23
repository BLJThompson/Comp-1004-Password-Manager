// JavaScript source code
// index.js

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
        showPasswordButton.addEventListener('click', function () {
            togglePasswordVisibility(websiteDiv);
        });

        websiteDiv.innerHTML = `
            <h2>${website.website.name || 'N/A'}</h2>
            <p>ID: ${website.website.id || 'N/A'}</p>
            <p>URL: ${website.website.url || 'N/A'}</p>
            <p>Username: ${website.website.credentials.username || 'N/A'}</p>
            <p>Password: <span class="password-dots">${'*'.repeat(website.website.credentials.password.length)}</span><span class="password-text" style="display:none">${website.website.credentials.password || 'N/A'}</span></p>
        `;

        websiteDiv.appendChild(showPasswordButton);
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