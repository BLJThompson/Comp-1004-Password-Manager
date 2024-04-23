// JavaScript source code
// upload-button.js

let userData = []; // Initialize userData as an empty array

document.getElementById('fileInput').addEventListener('change', handleFile);

// Function to upload a file
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
    fileInput.value = '';
}

// Function to handle the selected file
function handleFile(event) {
    const fileInput = event.target;

    // Ensure a file is selected
    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];

        // File type validation
        if (!selectedFile.type.match('application/json')) {
            alert('Please select a JSON file.');
            return;
        }


        // Read the content of the selected file as text
        const reader = new FileReader();
        reader.readAsText(selectedFile);

        reader.onload = function () {
            try {
                userData = JSON.parse(reader.result);
                console.log('Userdata loaded:', userData);
                displayUserData(userData);
            } catch (error) {
                console.error('Error parsing JSON:', error.message);
                alert('Error parsing JSON. Please check the file format.');
            }
        };
        // Error handling for file reading
        reader.onerror = function () {
            console.error('Error reading file');
            alert('Error reading file. Please try again.');
        };
    }
}