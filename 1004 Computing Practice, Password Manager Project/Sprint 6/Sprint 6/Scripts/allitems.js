// JavaScript source code
// allitems.js

function showAllItems() {
    // Scroll to the top of the screen
    window.scrollTo({ top: 0, behavior: 'smooth' });
    clearSearchBar();
    displayUserData(userdata);
}

// Function to clear the search bar
function clearSearchBar() {
    const searchBar = document.getElementById('searchInput');
    if (searchBar) {
        searchBar.value = '';

    }
}
