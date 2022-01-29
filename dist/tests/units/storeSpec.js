"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../../models/store");
const database_1 = __importDefault(require("../../database"));
const shop = new store_1.Product();
describe('Store model', () => {
    it('should have an index method', () => {
        expect(shop.view_all).toBeDefined();
    });
    it('should have a show by id method', () => {
        expect(shop.show_product_id).toBeDefined();
    });
    it('should have a show by categ method', () => {
        expect(shop.show_category).toBeDefined();
    });
    it('should have a create method', () => {
        expect(shop.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(shop.delete).toBeDefined();
    });
});
describe('test CRUD methods', () => {
    afterAll(async () => {
        const conn = await database_1.default.connect();
        const sql = 'DELETE FROM dental_products; \n ALTER SEQUENCE dental_products_id_seq RESTART WITH 1 \n';
        await conn.query(sql);
        conn.release();
    });
    it('should create a new product', async () => {
        const product = await shop.create({
            name: 'polishing discs',
            price: 90,
            category: 'restoration',
        });
        expect(product).toEqual({
            id: 1,
            name: 'polishing discs',
            price: 90,
            category: 'restoration',
        });
    });
    it('should view all products', async () => {
        const products = await shop.view_all();
        expect(products).toEqual([
            {
                id: 1,
                name: 'polishing discs',
                price: 90,
                category: 'restoration',
            },
        ]);
    });
    it('view one product by id', async () => {
        const product = await shop.show_product_id(1);
        expect(product).toEqual({
            id: 1,
            name: 'polishing discs',
            price: 90,
            category: 'restoration',
        });
    });
    it('view all products by category', async () => {
        const products = await shop.show_category('restoration');
        expect(products).toEqual([
            {
                id: 1,
                name: 'polishing discs',
                price: 90,
                category: 'restoration',
            },
        ]);
    });
    it('should delete product by id', async () => {
        const product = await shop.delete(1);
        expect(product).toEqual({
            id: 1,
            name: 'polishing discs',
            price: 90,
            category: 'restoration',
        });
    });
});