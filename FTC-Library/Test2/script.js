// JavaScript code for the book page
document.addEventListener('DOMContentLoaded', function () {
    const bookId = getBookIdFromURL(); // Get the book ID from the URL, for example, using query parameters

    // Fetch book details from the server
    fetchBookDetails(bookId)
        .then((book) => {
            // Update the book details section with fetched data
            displayBookDetails(book);
        })
        .catch((error) => {
            console.error('Error fetching book details:', error);
        });

    // Event listener for the "Borrow" button
    const borrowBtn = document.getElementById('borrow-btn');
    borrowBtn.addEventListener('click', function () {
        // Call the borrowBook function with the book ID
        borrowBook(bookId)
            .then((response) => {
                if (response.success) {
                    // If the book was successfully borrowed, update the availability status
                    updateAvailabilityStatus('Not Available');
                    borrowBtn.disabled = true;
                    borrowBtn.textContent = 'Borrowed';
                } else {
                    // Handle error messages if borrowing fails
                    alert('Failed to borrow the book. Please try again later.');
                }
            })
            .catch((error) => {
                console.error('Error borrowing the book:', error);
            });
    });

    // Function to get the book ID from the URL (this is a hypothetical function)
    function getBookIdFromURL() {
        // Implement logic to extract the book ID from the URL
        // For example, using query parameters
        const urlSearchParams = new URLSearchParams(window.location.search);
        return urlSearchParams.get('id');
    }

    // Function to fetch book details from the server (this is a hypothetical function)
    function fetchBookDetails(bookId) {
        // Replace the API endpoint with your actual endpoint
        const apiUrl = `https://api.example.com/books/${bookId}`;
        return fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => data.book);
    }

    // Function to handle book borrowing (this is a hypothetical function)
    function borrowBook(bookId) {
        // Replace the API endpoint with your actual endpoint for borrowing a book
        const borrowUrl = `https://api.example.com/borrow/${bookId}`;
        return fetch(borrowUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookId: bookId }),
        }).then((response) => response.json());
    }

    // Function to update the availability status (this is a hypothetical function)
    function updateAvailabilityStatus(status) {
        const availabilityElement = document.getElementById('availability');
        availabilityElement.textContent = `Availability: ${status}`;
    }

    // Function to display book details on the page
    function displayBookDetails(book) {
        const bookTitleElement = document.querySelector('.book h2');
        const bookAuthorElement = document.querySelector('.book p.author');
        const bookDescriptionElement = document.querySelector('.book p.description');
        const availabilityElement = document.querySelector('.book p.availability');

        bookTitleElement.textContent = book.title;
        bookAuthorElement.textContent = `Author: ${book.author}`;
        bookDescriptionElement.textContent = `Description: ${book.description}`;
        availabilityElement.textContent = `Availability: ${book.available ? 'Available' : 'Not Available'}`;

        // Update the "Borrow" button based on the book's availability status
        const borrowBtn = document.getElementById('borrow-btn');
        borrowBtn.disabled = !book.available;
        borrowBtn.textContent = book.available ? 'Borrow this book' : 'Not Available';
    }
});