// JavaScript source code
// export.js

function exportUserData() {
    try {
        let masterPassword = sessionStorage.getItem('masterPassword');

        if (!masterPassword) {
            throw new Error('No user data available for export, or master password is missing.');
        }

        // Check if userdata is empty and ask the user for confirmation
        if (!userdata || userdata.length === 0) {
            alert('No data in database!');
        }

        // Proceed to prepare the data for export
        const dataToExport = {
            masterPassword: masterPassword,
            entries: userdata || []
        };

        // Convert the data to a JSON string and create a Blob
        const jsonString = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Format the date as DD-MM-YYYY
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        // Create a link element to trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${formattedDate}-credentials.json`; 
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
    catch (error) {
        console.error('Error exporting userdata:', error);
        alert(error.message);
    }
}