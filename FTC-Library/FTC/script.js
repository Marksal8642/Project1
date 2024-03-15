// Sample books data
let books = [
    { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Fiction' },
    { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Non-fiction' },
    // Add more books here...
];

function displayBooks() {
    // Get the container div where books will be displayed
    const container = document.querySelector('.container');

    // Clear previous content
    container.innerHTML = '';

    // Loop through the books array and create elements for each book
    books.forEach((book) => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
        `;
        container.appendChild(bookElement);
    });
}

// Call the displayBooks function to initially show the books
displayBooks();

