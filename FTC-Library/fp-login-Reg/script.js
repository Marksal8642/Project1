// Function to handle login form submission
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Perform your login logic here
    console.log("Login details:", username, password);
});

// Function to handle registration form submission
document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    // Perform your registration logic here
    console.log("Registration details:", username, email, password);
});