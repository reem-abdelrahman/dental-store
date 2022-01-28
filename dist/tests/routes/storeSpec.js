"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
let token;
/*
describe('', ()=>{
    it('', async ()=>{
        const prod:product  = {
            name: 'polishing discs',
            price: 90,
            category: 'restoration'
        }

        beforeAll(async ()=>{
            const user: user = {
            firstname: 'Eman',
            lastname: 'Tantawy',
            password: '1234!!'}
            await request.post('/users').send(user).expect(200).then((response)=>{
                token = response.body
            })
        })
    })
}) */
