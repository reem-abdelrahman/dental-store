"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../models/users");
const shop = new users_1.User();
describe('Users model', () => {
    it('should have an index method', () => {
        expect(shop.view_users).toBeDefined();
    });
    it('should have a show by id method', () => {
        expect(shop.show_user).toBeDefined();
    });
    it('should have a create method', () => {
        expect(shop.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(shop.delete_user).toBeDefined();
    });
});
/*
describe("test CRUD methods", ()=>{
    // still needs authentication
    it("should create a new user", async ()=>{
        const result:user = await shop.create({
            firstname: 'Eman',
            lastname: 'Tantawy',
            password: '1234!!'
        })
        // needs auth testing only
        expect(result).toEqual({
            id: 1,
            firstname: 'Eman',
            lastname: 'Tantawy',
            password: '1234!!'
        })
    })
    it("should view all users", async ()=>{
        const result: user[] = await shop.view_users()
        expect(result.length).toEqual(1)
        expect(result[0].id).toEqual(1)
        expect(result[0].firstname).toEqual('Eman')
        expect(result[0].lastname).toEqual('Tantawy')
        expect(result[0].password).not.toEqual('1234!!')
        
    })
    it("view user by id", async ()=>{
        const result: user = await shop.show_user(1)
        expect(result.id).toEqual(1)
        expect(result.firstname).toEqual('Eman')
        expect(result.lastname).toEqual('Tantawy')
        expect(result.password).not.toEqual('1234!!')
    })
    
    it("should delete user by id", async ()=>{
        const result: user = await shop.delete_user(1)
        expect(result.id).toEqual(1)
        expect(result.firstname).toEqual('Eman')
        expect(result.lastname).toEqual('Tantawy')
        expect(result.password).not.toEqual('1234!!')
    })
}) */ 
