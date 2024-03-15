const loginFormContainer = document.getElementById('loginFormContainer');
const registrationFormContainer = document.getElementById('registrationFormContainer');
const loginForm = document.getElementById('loginForm');
const registrationForm = document.getElementById('registrationForm');
const loginMessage = document.getElementById('loginMessage');
const registrationMessage = document.getElementById('registrationMessage');

// Show login form and hide registration form by default
//registrationFormContainer.style.display = 'none';

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const loginUsername = formData.get('loginUsername');
  const loginPassword = formData.get('loginPassword');
  // Implement login functionality (client-side) here
  loginMessage.textContent = `Logging in as ${loginUsername}...`;
});

registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(registrationForm);
  const username = formData.get('username');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  // Implement registration functionality (client-side) here
  registrationMessage.textContent = `Registering user ${username}...`;
});

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt'); // For password hashing
const app = express();
const port = 5500;



// MySQL configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
};
app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
  })

  //get the client
  const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Endpoint to handle user registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: ' username email and password are required.' });
  }

  // Check if the username already exists in the database
  pool.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Server error. Please try again later.' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    // Hash the password before storing it in the database
    bcrypt.hash(password, 10, (hashError, hashedPassword) => {
      if (hashError) {
        console.error('Error hashing password:', hashError);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
      }

      // Store the new user in the database
      pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (insertError, insertResult) => {
        if (insertError) {
          console.error('Error inserting user into database:', insertError);
          return res.status(500).json({ error: 'Server error. Please try again later.' });
        }

        // User registration successful
        res.json({ message: 'User registered successfully.' });
      });
    });
  });
});

// Endpoint to handle user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Both username and password are required.' });
  }

  // Retrieve the user from the database by username
  pool.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Server error. Please try again later.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const user = results[0];
   
    // Compare the entered password with the hashed password stored in the database
    bcrypt.compare(password, user.password, (compareError, isMatch) => {
      if (compareError) {
        console.error('Error comparing passwords:', compareError);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }

      // Login successful
      res.json({ message: 'Login successful.' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${5500}`);
});