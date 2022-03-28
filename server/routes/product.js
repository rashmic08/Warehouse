const express = require('express');
const connection = require('../connection');
const router = express.Router();
const crypto = require("crypto");
const multer = require('multer');
var fs = require('fs')

const upload = multer({ dest: "uploads/" });

/*TODO PSEUDO CODE to imlement availability
  function updateAvailability() {

    create below map from articles table:

    map 1 articles_inventory =
    1 = 12 leg
    2 = 17 screw
    3 = 2 seat

    Create below map from Prod_Articles_Relation;
    map 2:
    21 = [[1, 4], [2, 8], [3, 1]]
    prodid = [[artid, art_qty_required], [artid, art_qty_required]];
    Fetch product table;
    Loop Products:
    prodavail = checkHowManyProductsPossibleWithCurrentArticles(prod id);
    Run update query on Products table and save it in DB
  }


  function checkHowManyProductsPossibleWithCurrentArticles(prod id) {
    count = 0;
    Create copy map 1 = m1_copy
    Get list of list from map 2
    while (true) {
      Loop list:
      var d = [1, 4]
      op = m1_copy[d[0]] - d[1]
      if (op < 0) { return count }
      else m1_copy[d[0]] = op;
    }
    count++;
  }
  return count;
}*/


router.post('/uploadfile', upload.single('file'), function (req, res) {
  if (!req.file) {
    console.log("No file upload");
  } else {
    fs.readFile(req.file.path, 'utf8', function (err, data) {
      if (err) {
        return console.error(err);
      }
      const jsonData = JSON.parse(data);
      jsonData.products.map((item) => {
        //TODO Replace with random id generator
        const productId = crypto.randomInt(200);
        connection.beginTransaction(function (err) {
          if (err) { throw err; }
          var sql = "INSERT INTO products (product_id, product_name, product_price, article_list) VALUES (?, ?, ?, ?)";
          connection.query(sql, [productId, item.name, 1000, 'test'], function (err, result) {
            if (err) {
              connection.rollback(function () {
                throw err;
              });
            }
            var availableItems = "";
            item.contain_articles.map((art) => {
              var sql1 = "INSERT INTO products_articles (product_id, article_id, amount_of) VALUES (?, ?, ?)";
              connection.query(sql1, [productId, art.art_id, art.amount_of], function (err, result) {
                if (err) {
                  connection.rollback(function () {
                    throw err;
                  });
                }
                var sql2 = "SELECT name FROM articles WHERE article_id=?";
                connection.query(sql2, [art.art_id], function (err, result) {
                  if (err) {
                    connection.rollback(function () {
                      throw err;
                    });
                  }
                  let x = art.amount_of + " " + result[0].name + ", ";
                  availableItems = availableItems + x;
                  var sql2 = "UPDATE products SET article_list =? WHERE product_id=?";
                  connection.query(sql2, [availableItems, productId], function (err, result) {
                    if (err) {
                      connection.rollback(function () {
                        throw err;
                      });
                    }
                    //TODO To implement updateAvailability() and show to the user
                    connection.commit(function (err) {
                      if (err) {
                        connection.rollback(function () {
                          throw err;
                        });
                      }
                    });
                  })
                })
              })
            })
          })
          //  connection.end();
        })
      })

    });
  }
  res.send("file saved on server");
});

router.get('/getProducts', (req, res) => {
  var sql = "SELECT * FROM products";
  connection.query(sql, function (err, result) {
    if (!err)
      res.status(200).json(result);
    else {
      res.status(500).json(err);
    }
  });
});

router.post('/sellProduct/:id', (req, res) => {
  let id = req.params.id;
  connection.beginTransaction(function (err) {
    if (err) { throw err; }
    var sql = "SELECT products_articles.article_id , amount_of, in_stock FROM products_articles INNER JOIN articles ON articles.article_id = products_articles.article_id WHERE product_id =?";
    connection.query(sql, id, function (err, result) {
      if (err) {
        connection.rollback(function () {
          throw err;
        });
      }
      result.map((article) => {
        if (article.amount_of <= article.in_stock) {
          var in_stock = article.in_stock - article.amount_of;
          var sql1 = "UPDATE articles SET in_stock = ? WHERE article_id = ?";
          connection.query(sql1, [in_stock, article.article_id], function (err, result) {
            if (err) {
              connection.rollback(function () {
                throw err;
              });
            }
            connection.commit(function (err) {
              if (err) {
                connection.rollback(function () {
                  throw err;
                });
              }
            });
          })
        }
      })
    })
  })
  res.status(200);
});

module.exports = router;