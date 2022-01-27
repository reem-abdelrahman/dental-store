"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorized_1 = require("../middleware/authorized");
const customer = new users_1.User();
const token_sec = process.env.TOKEN_SECRET;
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
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const new_user = await customer.create(user);
        let token = jsonwebtoken_1.default.sign({ user: new_user }, token_sec);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const authenticate = async (req, res) => {
    try {
        const { firstname, lastname, password } = req.body;
        const user = {
            firstname,
            lastname,
            password
        };
        const auth_user = await customer.authenticate(user.firstname, user.lastname, user.password);
        if (auth_user === null) {
            res.json("Please check your login in data").status(401);
        }
        else {
            // add token here 
            let token = jsonwebtoken_1.default.sign({ user: { id: auth_user.id, firstname, lastname } }, token_sec);
            res.json(token);
        }
    }
    catch (err) {
        throw new Error("Couldn't authenticate " + err);
    }
};
const destroy = async (req, res) => {
    const cancel = await customer.delete_user(parseInt(req.params.id));
    res.json(cancel);
};
const users_routes = (app) => {
    app.get('/users', authorized_1.authorized, index);
    app.get('/users/:id', authorized_1.authorized, show);
    app.post('/users', authorized_1.authorized, create);
    app.post('users/login', authenticate);
    app.delete('/users', authorized_1.authorized, destroy);
};
exports.default = users_routes;
