import supertest from 'supertest'
import {Product, product} from '../../models/store'
import app from '../../server'
import {user} from '../../models/users' 

const request = supertest(app);
let token
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
})