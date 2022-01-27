# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/products' [GET]
- Show '/products/:id' [GET]
- Create [token required] '/products' [POST] 
- Products by category (args: product category) '/products/:categ' [GET]

#### Users
- Index [token required] '/users' [GET]
- Show [token required] '/products/:users_id' [GET]
- Create N[token required] '/users' [POST]

#### Orders
- Current Order by user (args: user id)[token required] 'orders/latest/:user_id' [GET] 
- All Orders by user (args: user id) 'orders/:user_id' [GET]
- Create New Order (args: user id) '/orders' [POST]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

TABLE dental_products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    price integer,
    category VARCHAR(200)
)
#### User
- id
- firstName
- lastName
- password

TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(150),
    lastname VARCHAR(200),
    password VARCHAR(100)
)
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id integer,
    FOREIGN KEY (product_id) REFERENCES dental_products(id),
    quantity integer,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES users(id),
    status VARCHAR(10)
)

