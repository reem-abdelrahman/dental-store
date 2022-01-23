"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_TEST_DB, ENV } = process.env;
console.log("the env is" + ENV);
const database = new pg_1.Pool({
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: ENV === "test" ? POSTGRES_TEST_DB : POSTGRES_DB
});
exports.default = database;
