// JavaScript source code
// rawdata.js + debugging code


// Function to export raw data
function exportUserData() {
    const dataToExport = {
        entries: userData || [],
        secureNotes: secureNotesData || []
    };

    try {
        const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
        downloadDataWithDate(blob, "unencrypted-user_data");
    } catch (error) {
        console.error('Failed to export data:', error);
        alert('Failed to export data. Please check the console for more details.');
    }
}

// Function to load Unencrypted file
async function loadUnencryptedFile() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Please select a file to load.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    try {
        const fileContents = await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });

        const data = JSON.parse(fileContents);
        if (!data || !data.entries || !data.secureNotes) {
            throw new Error("The file does not have the correct structure. Missing 'entries' or 'secureNotes' key.");
        }

        userData = data.entries;
        secureNotesData = data.secureNotes;
        displayUserData(userData);
        displaySecureNotes(secureNotesData);
        removeLoginModal(); 
    } catch (error) {
        alert('Failed to load file: ' + error.message);
        console.error('Load file error:', error);
    }
}
