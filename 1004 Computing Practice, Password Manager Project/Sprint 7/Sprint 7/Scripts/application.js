// JavaScript source code
// app.js


// Array to hold user data
var userData = [];

// Array to hold secure notes
var secureNotesData = [];

// Function to get data for download
function downloadDataWithDate(blob, filenamePrefix) {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const filename = `${formattedDate}-${filenamePrefix}.json`;

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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

// Function to generate a random password
function generatePassword() {
    const length = Math.floor(Math.random() * 5) + 14; // Generates a random number between 14 and 18

    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
    let password = "";
    for (let i = 0; i < length; ++i) {
        let randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// Function to scroll to an element on the page
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

// Function to get data and time of creation
function getDateTime() {
    const date = new Date();
    return date.toLocaleString();
}