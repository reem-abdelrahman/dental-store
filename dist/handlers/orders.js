"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const authorized_1 = require("../middleware/authorized");
const profit = new orders_1.Order;
// latest order by user
const show = async (req, res) => {
    const order = await profit.show_order_id(parseInt(req.params.user_id));
    res.json(order);
};
const show_status = async (req, res) => {
    const order = await profit.show_order_status(req.params.status);
    res.json(order);
};
// create a new order
const create = async (req, res) => {
    try {
        const new_order = await profit.create_order(req.body);
        res.json(new_order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// may show error
const addP = async (req, res) => {
    try {
        const addThis = {
            order_id: parseInt(req.params.order_id),
            quantity: req.body.quantity,
            product_id: req.body.product_id
        };
        const addedP = await profit.addProd(addThis);
        res.json(addedP);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const cancel = await profit.delete(parseInt(req.params.order_id));
    res.json(cancel);
};
const orders_routes = (app) => {
    app.get('/orders/latest/:user_id', authorized_1.authorized, show);
    app.get('orders/:status', show_status);
    app.post('/orders', create);
    app.post('orders/:order_id/products', addP);
    app.delete('/orders/:order_id', destroy);
};
exports.default = orders_routes;
