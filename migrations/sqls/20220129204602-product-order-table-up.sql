CREATE TABLE product_order (
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    order_id integer REFERENCES orders(id),
    product_id integer REFERENCES dental_products(id) 
);