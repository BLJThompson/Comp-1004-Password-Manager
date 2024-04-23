// JavaScript source code
// export-button.js

function exportUserData() {
    try {
        // Check if userData is defined and not empty
        if (!userData || userData.length === 0) {
            throw new Error('No user data available for export.');
        }

        const jsonString = JSON.stringify(userData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);

        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();
        link.download = `${day}-${month}-${year}-credentials.json`;

        // Append the link to the document
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        // Display errors
        console.error('Error exporting userdata:', error.message);
        alert(`Error exporting userdata: ${error.message}`);
    }
}
