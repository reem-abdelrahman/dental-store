"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../models/store");
const shop = new store_1.Product();
const index = async (_req, res) => {
    const products = await shop.view_all();
    res.json(products);
};
const show_id = async (req, res) => {
    const product = await shop.show_product_id(parseInt(req.params.id));
    res.json(product);
};
const show_categ = async (req, res) => {
    const categ = await shop.show_product_category(req.params.categ);
    res.json(categ);
};
const create = async (req, res) => {
    try {
        const new_product = await shop.create(req.body);
        res.json(new_product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const cancel = await shop.delete(req.body.id);
    res.json(cancel);
};
const products_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show_id);
    app.get('/products/:categ', show_categ);
    app.post('/products', create);
    app.delete('/products', destroy);
};
exports.default = products_routes;
