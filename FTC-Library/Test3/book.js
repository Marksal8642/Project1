// Sample data for demonstration purposes
const books = [
    { title: "java in two semester", author: "O, Real" },
    { title: "Programming Book", author: "Francis, Koroma" },
    { title: "Data Structure", author: "Koroma Mark" },
    // Add more books as needed
  ];
  
  function searchBooks() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "booksTable.html";
  
    const filteredBooks = books.filter((book) => {
      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();
      return title.includes(searchInput) || author.includes(searchInput);
    });
  
    if (filteredBooks.length === 0) {
      searchResults.innerHTML = "<p>No results found.</p>";
    } else {
      filteredBooks.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.innerHTML = `<p>Title: ${book.title}</p><p>Author: ${book.author}</p>`;
        searchResults.appendChild(bookDiv);
      });
    }
  }