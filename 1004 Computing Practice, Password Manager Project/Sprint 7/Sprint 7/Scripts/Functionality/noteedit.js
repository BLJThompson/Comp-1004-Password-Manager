// JavaScript source code
// noteedit.js

function openEditSecureNoteForm(note, container) {
    if (document.querySelector('.edit-note-modal')) return; 

    // Create a backdrop
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'edit-note-modal-backdrop';
    document.body.appendChild(modalBackdrop);  

    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'edit-note-modal';

    // Setup modal internal content
    modal.innerHTML = `
        <div class="edit-note-modal-content">
            <div class="modal-header">
                <h2>Edit Secure Note</h2>
                <button class="close-modal-btn" onclick="closeModal('.edit-note-modal-backdrop')">X</button>
            </div>
            <form onsubmit="saveSecureNoteChanges(event, ${note.secureNote.SecID})">
                <label for="noteName-${note.secureNote.SecID}">Name:</label>
                <input type="text" id="noteName-${note.secureNote.SecID}" value="${note.secureNote.SecName}" required>
                <label for="noteContent-${note.secureNote.SecID}">Note:</label>
                <textarea id="noteContent-${note.secureNote.SecID}">${note.secureNote.SecNote}</textarea>
                <div class="modal-footer">
                    <button type="submit" class="savenote-btn">Save Changes</button>
                    <button type="button" class="deletenote-btn" onclick="deleteSecureNote(${note.secureNote.SecID})">Delete</button>
                </div>
            </form>
        </div>
    `;

    modalBackdrop.appendChild(modal);  

    const form = modal.querySelector('form');
    form.onsubmit = function (e) {
        e.preventDefault();
        const updatedName = document.getElementById(`noteName-${note.secureNote.SecID}`).value;
        const updatedContent = document.getElementById(`noteContent-${note.secureNote.SecID}`).value;
        updateSecureNoteDetails(note.secureNote.SecID, updatedName, updatedContent);
        closeModal('.edit-note-modal-backdrop'); 
    };

    // Setup deletion of the note
    const deleteButton = modal.querySelector('.deletenote-btn');
    deleteButton.onclick = () => deleteSecureNote(note.secureNote.SecID);
}

// Function to close the modal
function closeModal(selector) {
    const modalBackdrop = document.querySelector(selector);
    if (modalBackdrop) {
        modalBackdrop.remove();
    }
}
// Function to save the changes made to the secure note
function updateSecureNoteDetails(noteId, name, content) {
    // Find and update the note in the secureNotesData array
    const noteIndex = secureNotesData.findIndex(n => n.secureNote.SecID === noteId);
    if (noteIndex !== -1) {
        secureNotesData[noteIndex].secureNote.SecName = name;
        secureNotesData[noteIndex].secureNote.SecNote = content;
        displaySecureNotes(secureNotesData);
    } else {
        alert('Failed to update note. Note not found.');
    }
}

// Function to delete the secure note
function deleteSecureNote(noteId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const noteIndex = secureNotesData.findIndex(note => note.secureNote.SecID === noteId);
            if (noteIndex > -1) {
                secureNotesData.splice(noteIndex, 1);
                displaySecureNotes(secureNotesData);
                Swal.fire(
                    'Deleted!',
                    'Your secure note has been deleted.',
                    'success'
                );
            } else {
                console.error("Secure note not found");
                alert("Secure note not found. Could not delete.");
            }
        }
    });
    closeModal('.edit-note-modal-backdrop'); 
}

