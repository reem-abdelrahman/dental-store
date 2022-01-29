"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../models/store");
const authorized_1 = require("../middleware/authorized");
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
    const categ = await shop.show_category(req.params.category);
    res.json(categ);
};
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const new_product = await shop.create(product);
        res.json(new_product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const cancel = await shop.delete(parseInt(req.params.id));
    res.json(cancel);
};
const products_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show_id);
    app.get('/products/category/:category', show_categ);
    app.post('/products', authorized_1.authorized, create);
    app.delete('/products/:id', destroy);
};
exports.default = products_routes;