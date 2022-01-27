"use strict";
// still need to add unit testing
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const store_1 = require("../../models/store");
const users_1 = require("../../models/users");
const shop = new orders_1.Order();
describe('Store model', () => {
    it('should have an index method', () => {
        expect(shop.view_all).toBeDefined();
    });
    it('should have a show by id method', () => {
        expect(shop.show_order_id).toBeDefined();
    });
    it('should have a create method', () => {
        expect(shop.create_order).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(shop.delete).toBeDefined();
    });
});
describe("test CRUD methods", () => {
    const product = new store_1.Product();
    const user = new users_1.User();
    beforeAll(async () => {
        await product.create({
            name: 'polishing discs',
            price: 90,
            category: 'restoration'
        });
        afterAll(async () => {
            await product.delete(1);
            await user.delete_user(1);
        });
        await user.create({
            firstname: "FKA",
            lastname: "Twigs",
            password: "metaangel2022"
        });
    });
    it("should create a new order", async () => {
        const result = await shop.create_order({
            product_id: 1,
            quantity: 15,
            user_id: 1,
            status: "active"
        });
        expect(result).toEqual({
            id: 1,
            product_id: 1,
            quantity: 15,
            user_id: 1,
            status: "active"
        });
    });
    it("should view all orders of user's id", async () => {
        const result = await shop.view_all(1);
        expect(result).toEqual([{
                id: 1,
                product_id: 1,
                quantity: 15,
                user_id: 1,
                status: "active"
            }]);
    });
    it("view one order by id", async () => {
        const result = await shop.show_order_id(1);
        expect(result).toEqual({
            id: 1,
            product_id: 1,
            quantity: 15,
            user_id: 1,
            status: "active"
        });
    });
    /* it("view orders by status", async ()=>{
         const result: order[] = await shop.show_o("active")
         expect(result).toEqual([{
             id: 1,
             product_id: 1,
             quantity: 15,
             user_id: 1,
             status: "active"
         }])
     }) */
    it("should delete order by id", async () => {
        const result = await shop.delete(1);
        expect(result).toEqual({
            id: 1,
            product_id: 1,
            quantity: 15,
            user_id: 1,
            status: "active"
        });
    });
});
