// JavaScript source code
// addsecnotes.js

// Function to add secure notes
function showAddSecureNoteModal() {

    if (document.getElementById('addSecureNoteModal')) return;

    // Create modal backdrop
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'add-password-modal-backdrop'; 
    document.body.appendChild(modalBackdrop);

    // Create modal content
    const modal = document.createElement('div');
    modal.id = 'addSecureNoteModal';
    modal.className = 'add-password-modal-container';
    modal.innerHTML = `
        <div class="add-password-modal-content">
            <div class="add-password-modal-header">
                <button class="close-button" onclick="closeAddSecureNoteModal()">X</button>
                <h2>Add New Secure Note</h2>
            </div>
            <form id="addSecureNoteForm" class="add-password-form">
                <div class="form-group">
                    <label for="secureNoteName" class="website-name-label">Note Name:</label>
                    <input type="text" id="secureNoteName" class="website-name-input" placeholder="Note Name" required>
                </div>
                <div class="form-group">
                    <label for="secureNoteContent" class="website-notes-label">Note Content:</label>
                    <textarea id="secureNoteContent" class="website-notes-input" placeholder="Enter your note here..."></textarea>
                </div>
                <div class="form-action-buttons">
                    <button type="submit" class="save-password-btn">Save Note</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    modalBackdrop.appendChild(modal);
    document.getElementById('addSecureNoteForm').addEventListener('submit', saveNewSecureNote);
}

// Function to save new secure note
function saveNewSecureNote(event) {
    event.preventDefault();
    const noteName = document.getElementById('secureNoteName').value;
    const noteContent = document.getElementById('secureNoteContent').value;

    const newNote = {
        secureNote: {
            SecID: generateNextSecID(secureNotesData),
            SecName: noteName,
            SecNote: noteContent
        }
    };
    secureNotesData.push(newNote);
    displaySecureNotes(secureNotesData);
    closeAddSecureNoteModal();
    scrollToElement('secureNotesDisplay');
}
// Function to close the add secure note modal
function closeAddSecureNoteModal() {
    const modal = document.getElementById('addSecureNoteModal');
    if (modal) {
        modal.remove();
    }
    document.body.removeChild(document.querySelector('.add-password-modal-backdrop'));
}


// Function to generate the next secure note ID
function generateNextSecID(notes) {
    if (notes.length === 0) return "1";  
    const ids = notes.map(item => parseInt(item.secureNote.SecID)).sort((a, b) => a - b);

    for (let i = 0; i < ids.length; i++) {
        if (ids[i] !== i + 1) {
            return (i + 1).toString(); 
        }
    }
    return (ids.length + 1).toString();
}
