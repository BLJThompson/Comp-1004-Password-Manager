// JavaScript source code
// export-button.js

function exportUserData() {
    try {
        // Check if userData is defined and not empty
        if (!userData || userData.length === 0) {
            throw new Error('No user data available for export.');
        }

        // Convert JSON to string
        const jsonString = JSON.stringify(userData, null, 2);

        // Create a Blob from the JSON string
        const blob = new Blob([jsonString], { type: 'application/json' });
        const link = document.createElement('a');

        // Set the link's href attribute to a URL with the Blob
        link.href = window.URL.createObjectURL(blob);

        // Set the filename for the download with the current date in day-month-year format
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

        //Display any errors
        console.error('Error exporting userdata:', error.message);
        alert(`Error exporting userdata: ${error.message}`);
    }
}
