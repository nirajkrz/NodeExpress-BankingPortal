const fs = require('fs');
const path = require('path');

const express = require('express');

const app = new express();

app.set('views',path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

const accountData = fs.readFileSync(
    path.join(__dirname, 'json', 'accounts.json'), 'utf8'
);

const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(
    path.join(__dirname, 'json', 'users.json'), 'utf8'
);


// const accountRoutes = require('./routes/accounts.js')
// const servicesRoutes = require('./routes/services.js')

const users = JSON.parse(userData);

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts: accounts }));

// app.use('/account',accountRoutes);
// app.use('/services',servicesRoutes);

app.get('/profile', (req, res) =>  res.render('profile', { user: users[0] }));

app.listen(3000, () => { console.log('PS Project Running on port 3000!') });