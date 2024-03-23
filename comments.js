// Create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

// Set the port
const port = 3000;

// Set the path for the static files
app.use(express.static(path.join(__dirname, 'public')));

// Set the body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine
app.set('view engine', 'pug');

// Set the path for the views
app.set('views', path.join(__dirname, 'views'));

// Set the route for the home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Set the route for the comments page
app.get('/comments', (req, res) => {
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const comments = JSON.parse(data);
            res.render('comments', { title: 'Comments', comments: comments });
        }
    });
});

// Set the route for the new comments page
app.get('/comments/new', (req, res) => {
    res.render('new', { title: 'New Comment' });
});

// Set the route for the new comments page
app.post('/comments', (req, res) => {
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const comments = JSON.parse(data);
            comments.push({
                name: req.body.name,
                comment: req.body.comment
            });
            fs.writeFile('./data/comments.json', JSON.stringify(comments, null, 4), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/comments');
                }
            });
        }
    });
});

// Set the route for the 404 page
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Listen on the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


