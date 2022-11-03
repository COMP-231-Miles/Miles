//app.js will hold the express app
const express = require('express');

const app = express();

//middleware
app.use((req, res, next) => {
    console.log('middleware');
    next();
});

app.use((req, res, next) => {
    res.send('Hello from express');
});

module.exports = app;