const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/wedding',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const app = express();

app.use(express.json()); 
app.use(express.urlencoded());

// An api endpoint that returns a short list of items
app.post('/api/auth', (req, res) => {
    console.log('/api/auth', req.body.pwd)
    if (req.body.pwd) {
        return response(res, req.body.pwd == process.env.AFBG_WEDDING_PWD ? 200 : 400)
    }
    return response(res, 500)
});

// State storage
app.post('/api/state', (req, res) => {
    console.log('/api/state set', res)
    return response(res, 200)
});

app.get('/api/state', (req, res) => {
    console.log('/api/state get', res)
    return response(res, 200, {})
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    console.log('/*', req, process.env)
    return response(res, 500)
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);