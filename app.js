const express = require('express');
const leapcell = require('@leapcell/leapcell-js');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.get('/', async (request, response) => {
    const api = new leapcell.Leapcell({
        apiKey: 'lpcl_3079002420.21e580a433ce0b1cae979ddfd8b33021',
        endpoint: 'http://localhost:8080',
    });
    const table = api.repo('salamer/myblog').table('tbl1702010602858938368', 'name');
    const records = await table.records.findMany({});
    return response.render('index', {
        subject: 'EJS template engine',
        name: 'our template',
        link: 'https://google.com'
    });
});
app.listen(8000, () => {
    console.log('App is listening on port 8000');
});