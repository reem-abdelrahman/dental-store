CREATE TABLE dental_products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    price integer,
    category VARCHAR(200)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(150),
    lastname VARCHAR(200),
    password VARCHAR(100)
);


CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    status VARCHAR(10)
);


CREATE TABLE product_order (
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    order_id integer REFERENCES orders(id),
    product_id integer REFERENCES dental_products(id)
    
     
);