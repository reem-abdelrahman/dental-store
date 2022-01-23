"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const customer = new users_1.User();
const index = async (_req, res) => {
    const users = await customer.view_users();
    res.json(users);
};
const show = async (req, res) => {
    const user = await customer.show_user(parseInt(req.params.id));
    res.json(user);
};
const create = async (req, res) => {
    try {
        const new_user = await customer.create(req.body);
        res.json(new_user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const cancel = await customer.delete_user(parseInt(req.params.id));
    res.json(cancel);
};
const users_routes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users', destroy);
};
exports.default = users_routes;
