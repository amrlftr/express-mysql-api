const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./Members');
const app = express();

// usage of middleware
// const logger = require('./middleware/logger');

// middleware init
// app.use(logger);

// middleware handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// body parser middleware // so that we can get body of the data that we're sending ie req.body.name
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('index', {
    title: 'Member Management System',
    members
}));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));