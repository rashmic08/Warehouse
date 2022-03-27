# Warehouse
Scan the dependency files

# install dependencies
npm install

## Database
CREATE TABLE products (
    products_id INT NOT NULL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
	product_price INT
    article_list VARCHAR(255)
);

CREATE TABLE articles (
    article_id INT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    in_stock INT NOT NULL DEFAULT 0
);
CREATE TABLE products_articles (
    product_id INT NOT NULL,
    article_id INT NOT NULL,
    amount_of  INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (article_id) REFERENCES articles(id)
);
