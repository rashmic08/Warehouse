# Warehouse
Get all products and quantity of each that is available with the current inventory
Remove(Sell) a product and update the inventory accordingly

# The solution
REST API implemented in node.js to manipulate the products and inventory of the warehouse.
UI implemented in reacj.js
DB used mysql

# install dependencies
npm install

# Create tables in mysql
See database.sql

# Run client
npm start

# Run server
npm run start

# API

POST article/uploadfile

Load products from inventory.json file and store it in database.

POST product/uploadfile

Load products from product.json file and store it in database.

GET /getProducts
Returns all products with it's articles in the stock.

GET /getArticles
Returns all the articles in the stock.

POST /sellProduct/:id

Sells a product from the warehouse system and update inventory accordingly.

# TODO
checkHowManyProductsPossibleWithCurrentArticles

updateAvailability
