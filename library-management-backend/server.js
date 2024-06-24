const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'LibraryDB'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Endpoint to add a book
app.post('/books', (req, res) => {
    const { title, author, isbn, publishedYear } = req.body;
    const query = 'INSERT INTO Books (Title, Author, ISBN, PublishedYear) VALUES (?, ?, ?, ?)';
    db.query(query, [title, author, isbn, publishedYear], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Book added successfully');
        }
    });
});

// Other CRUD endpoints here...

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
