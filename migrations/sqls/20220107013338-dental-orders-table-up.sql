/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id integer,
    FOREIGN KEY (product_id) REFERENCES dental_products(id),
    quantity integer,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES users(id),
    status VARCHAR(10)
);