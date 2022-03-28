# Warehouse
Get all products and quantity of each that is available with the current inventory.
Buy a product and update the inventory accordingly

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

# Screenshots

![Screenshot 2022-03-28 at 07 51 46](https://user-images.githubusercontent.com/27699060/160334621-a5f1574f-12d8-4dd7-b8a4-864a6a2bb9c2.png)

![Screenshot 2022-03-28 at 07 51 59](https://user-images.githubusercontent.com/27699060/160334652-2788df71-defa-4f20-840b-3e467dc2e727.png)


# TODO
checkHowManyProductsPossibleWithCurrentArticles

updateAvailability
