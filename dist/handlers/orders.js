"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const authorized_1 = require("../middleware/authorized");
const profit = new orders_1.Order();
// latest order by user
const show = async (req, res) => {
    const order = await profit.show_order_id(parseInt(req.params.user_id));
    res.json(order);
};
// create a new order
const create = async (req, res) => {
    try {
        const order = {
            user_id: req.body.user_id,
            status: req.body.status,
        };
        const new_order = await profit.create_order(order);
        res.json(new_order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const cancel = await profit.delete(parseInt(req.params.id));
    res.json(cancel);
};
const orders_routes = (app) => {
    app.get('/orders/latest/:user_id', authorized_1.authorized, show);
    app.post('/orders', create);
    app.delete('/orders/:id', destroy);
};
exports.default = orders_routes;
