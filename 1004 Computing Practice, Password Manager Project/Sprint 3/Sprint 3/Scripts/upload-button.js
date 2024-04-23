// JavaScript source code
// upload-button.js

// Initialize userData
let userData = null; 

// Event listener for the file input
document.getElementById('fileInput').addEventListener('change', handleFile);

// Function to handle file input
function handleFile(event) {
    const fileInput = event.target;

    // Ensure a file is selected
    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];
        const reader = new FileReader();

        // Read the content of the selected file as text
        reader.readAsText(selectedFile);
        reader.onload = function () {
            try {
                userData = JSON.parse(reader.result);
                console.log('Userdata loaded:', userData);
                displayUserData(userData);
            } catch (error) {
                console.error('Error parsing JSON:', error.message);
            }
        };
    }
}