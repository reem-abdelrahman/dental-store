import { dental_product, product, Product } from '../../models/store'

const shop = new Product();

describe('Store model' ,  () => {
    it('should have an index method', ()=>{
        expect(shop.view_all).toBeDefined();
    });
    it('should have a show by id method', ()=>{
        expect(shop.show_product_id).toBeDefined();
    });
    it('should have a show by categ method', ()=>{
        expect(shop.show_product_category).toBeDefined();
    });
    it('should have a create method', ()=>{
        expect(shop.create).toBeDefined();
    });
    it('should have a delete method', ()=>{
        expect(shop.delete).toBeDefined();
    });
});

const dummyproduct: product = {     name: 'polishing discs',
price: 90,
category: 'restoration'};

let product: dental_product;
describe("test CRUD methods", ()=>{
    it("should create a new product", async ()=>{
        product = await shop.create(dummyproduct)
        expect(product).toEqual({
            id: product.id,
            name: 'polishing discs',
            price: 90,
            category: 'restoration'
        })
    })
    it("should view all products", async ()=>{
        const products: dental_product[] = await shop.view_all()
        expect(products).toContain(product)
    })
    it("view one product by id", async ()=>{
        const viewproduct: dental_product = await shop.show_product_id(product.id)
        expect(viewproduct).toEqual(product)
    })
    it("view all products by category", async ()=>{
        const products: dental_product[] = await shop.show_product_category('restoration')
        expect(products).toContain(product)
    })
    it("should delete product by id", async ()=>{
        const deleted_product = await shop.delete(product.id)
        expect(deleted_product.id).toEqual(product.id)
    })
})