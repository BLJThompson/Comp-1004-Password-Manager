// JavaScript source code
// export-button.js

function exportUserData() {
    try {
        // Check if userData is defined and not empty
        if (!userData || userData.length === 0) {
            throw new Error('No user data available for export.');
        }
        // Convert the userData array to a JSON string with 2-space indentation
        const jsonString = JSON.stringify(userData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Create a download link
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();

        // Set the link's download attribute to the filename
        link.download = `${day}-${month}-${year}-credentials.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        // Display erros
        console.error('Error exporting userdata:', error.message);
        alert(`Error exporting userdata: ${error.message}`);
    }
}
