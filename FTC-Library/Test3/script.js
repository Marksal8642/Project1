// Wait for the document to be fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Get the search form element
    const searchForm = document.getElementById("search-form");
  
    // Add event listener to the form submission
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission
  
      // Get the value entered in the search input
      const searchInput = document.getElementById("search-input").value;
  
      // Do something with the search input (for example, log it)
      console.log("User searched for:", searchInput);
    });
  });
      