// JavaScript source code
// upload-button.js

let masterPassword = []; // Initialize masterPassword
let userdata = []; // Initialize userdata

document.getElementById('fileInput').addEventListener('change', handleFile);

// Function to handle the file upload
function handleFile(event) {
    const fileInput = event.target;

    // Ensure a file is selected
    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];

        // File type and size validation
        if (!selectedFile.type.match('application/json')) {
            alert('Please select a JSON file.');
            return;
        }

        // Read the content of the selected file as text
        const reader = new FileReader();
        reader.readAsText(selectedFile);

        reader.onload = function () {
            try {
                const fileContent = JSON.parse(reader.result);

                // Storing the masterPassword in sessionStorage
                if (fileContent.masterPassword) {
                    sessionStorage.setItem('masterPassword', fileContent.masterPassword);
                } else {
                    alert('Master password not found in file.');
                    return;
                }

                // Storing the userdata
                userdata = fileContent.entries ? fileContent.entries : [];
                console.log('Userdata loaded:', userdata); 

                // Display the data after loading
                displayUserData(userdata);

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