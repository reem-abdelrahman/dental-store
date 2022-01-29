"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_TEST_DB, ENV, } = process.env;
const config = {
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT),
    database: ENV === 'dev'
        ? POSTGRES_DB
        : POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
};
const database = new pg_1.Pool(config);
console.log('the env is ' +
    ENV +
    '' +
    JSON.stringify(config));
exports.default = database;
