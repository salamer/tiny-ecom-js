const express = require('express');
const leapcell = require('@leapcell/leapcell-js');
// let engine = require('ejs-locals');

const path = require('path');
const app = express();
// app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

const api = new leapcell.Leapcell({
    apiKey: process.env.LEAPCELL_API_KEY,
});
const table = api.repo('salamer/myblog').table('tbl1707363939983331328', 'name');


app.get('/', async (request, response) => {
    try {
        const res = await table.records.findMany({});
        return response.render('index', {
            products: res,
        });
    } catch (error) {
        console.log(error);
    }

    return response.render('index', {
        products: [],
    });
});

app.get("/product/:id", async (request, response) => {

    const res = await table.records.findById(request.params.id);
    return response.render('product', {
        product: res,
    });
});

app.get("/hello", (request, response) => {
    return response.send("Hello World");
});

app.listen(8000, () => {
    console.log('App is listening on port 8000');
});