"use strict";
// still need to add unit testing
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const store_1 = require("../../models/store");
const users_1 = require("../../models/users");
const database_1 = __importDefault(require("../../database"));
const shop = new orders_1.Order();
describe('Order model', () => {
    it('should have a show by id method', () => {
        expect(shop.show_order_id).toBeDefined();
    });
    it('should have a create method', () => {
        expect(shop.create_order).toBeDefined();
    });
    it('should have an add productmethod', () => {
        expect(shop.addProd).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(shop.delete).toBeDefined();
    });
});
describe("test CRUD methods", () => {
    const create_product = new store_1.Product();
    const user = new users_1.User();
    let P;
    let result;
    const dummy_order = { user_id: "", status: "active" };
    let dummy_product;
    beforeAll(async () => {
        P = await create_product.create({
            name: 'polishing discs',
            price: 90,
            category: 'restoration'
        });
        if (P.id)
            dummy_product = P;
        const new_user = await user.create({
            firstname: "FKA",
            lastname: "Twigs",
            password: "metaangel2022"
        });
        if (new_user.id)
            dummy_order.user_id = new_user.id.toString();
    });
    it("should create a new order", async () => {
        result = await shop.create_order(dummy_order);
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            status: "active"
        });
    });
    it("should add a product to the order", async () => {
        const added_product = await shop.addProd({
            quantity: 15,
            order_id: result.id,
            product_id: P.id
        });
        expect(added_product).toEqual({
            quantity: 15,
            order_id: 1,
            product_id: 1,
            id: 1
        });
    });
    it("view one order by id", async () => {
        const result = await shop.show_order_id(1);
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            status: "active"
        });
    });
    it("view orders by status", async () => {
        const result = await shop.show_order_status("active");
        expect(result).toEqual([{
                id: 1,
                user_id: 1,
                status: "active"
            }]);
    });
    it("should delete order by id", async () => {
        const sql = 'DELETE FROM product_order; \n ALTER SEQUENCE product_order_id_seq RESTART WITH 1';
        const conn = await database_1.default.connect();
        await conn.query(sql);
        conn.release();
        const result = await shop.delete(1);
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            status: "active"
        });
    });
    afterAll(async () => {
        const sql = 'DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1; \n DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1; \n DELETE FROM dental_products; \n ALTER SEQUENCE dental_products_id_seq RESTART WITH 1 \n';
        const conn = await database_1.default.connect();
        await conn.query(sql);
        conn.release();
    });
});
