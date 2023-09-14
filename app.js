const express = require('express');
const leapcell = require('@leapcell/leapcell-js');
// let engine = require('ejs-locals');

const path = require('path');
const app = express();
// app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

const api = new leapcell.Leapcell({
    apiKey: 'lpcl_3079002420.21e580a433ce0b1cae979ddfd8b33021',
    endpoint: 'http://localhost:8080',
});
const table = api.repo('salamer/myblog').table('tbl1702010602858938368', 'name');


app.get('/', async (request, response) => {
    const res = await table.records.findMany({});
    return response.render('index', {
        products: res.records,
    });
});

app.get("/product/:id", async (request, response) => {

    const res = await table.records.findById(request.params.id);
    return response.render('product', {
        product: res.record,
    });
});

app.listen(8000, () => {
    console.log('App is listening on port 8000');
});