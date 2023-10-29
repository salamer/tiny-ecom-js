const express = require('express');
const leapcell = require('@leapcell/leapcell-js');
// let engine = require('ejs-locals');

const path = require('path');
const app = express();
// app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

const api = new leapcell.Leapcell({
    apiKey: process.env.LP_API_KEY,
});

const resource = process.env.RESOURCE || "salamer/econ";
const tableId = process.env.TABLE_ID || "tbl1718517096606511104";

const table = api.repo(resource).table(tableId, 'name');


app.get('/', async (request, response) => {
    try {
        const res = await table.records.findMany();

        return response.render('index', {
            products: res.map((product) => {
                return {
                    id: product.record_id,
                    name: product.fields["Name"],
                    category: product.fields["Categories"],
                    price: product.fields["Price"],
                    cover: product.fields["Cover"][0],
                    status: product.fields["Status"],
                };
            }),
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

app.get("/category/:category", async (request, response) => {

    const res = await table.records.findMany({
        where: {
            "Categories": {
                "contain": request.params.category
            }
        }
    })
    const products = res.map((product) => {
        return {
            id: product.record_id,
            name: product.fields["Name"],
            category: product.fields["Categories"],
            price: product.fields["Price"],
            cover: product.fields["Cover"][0],
            status: product.fields["Status"],
        };
    });
    return response.render('index', {
        products: products,
        category: request.params.category
    });
});

app.get("/status/:status", async (request, response) => {
    var whereParams = {}
    if (request.params){
        whereParams = {
            "Status": {
                "eq": decodeURIComponent(request.params.status)
            }
        }
    }

    const res = await table.records.findMany({
        where: whereParams
    })
    const products = res.map((product) => {
        return {
            id: product.record_id,
            name: product.fields["Name"],
            category: product.fields["Categories"],
            price: product.fields["Price"],
            cover: product.fields["Cover"][0],
            status: product.fields["Status"],
        };
    });
    return response.render('index', {
        products: products,
        category: request.params.category
    });
});

app.get("/hello", (request, response) => {
    return response.send("Hello World");
});

app.listen(8000, () => {
    console.log('App is listening on port 8000');
});