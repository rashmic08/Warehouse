const express = require('express');
const connection = require('../connection');
const router = express.Router();

const multer = require('multer');
var fs = require('fs')

const upload = multer({ dest: "uploads/" });

var articles = [];

function objectToArray(obj) {
  var array = []
  var obj_keys = Object.keys(obj).sort()
  for (var i = 0; i < obj_keys.length; i++) {
    array.push(obj[obj_keys[i]])
  }
  return array
}

router.post('/uploadfile', upload.single('file'), function (req, res) {
  if (!req.file) {
    console.log("No file upload");
  } else {

    fs.readFile(req.file.path, 'utf8', function (err, data) {
      if (err) {
        return console.error(err);
      }
      const jsonData = JSON.parse(data);
      jsonData.inventory.map(function (object) {
        articles.push(objectToArray(object))
      });

      var sql = "INSERT INTO articles (article_id, name, in_stock) VALUES ?";
      connection.query(sql, [articles], function (err) {
        if (err)
          res.status(500).json(err);
      });
    });
  }
  res.send("file saved on server");
});

router.get('/getArticles', (req, res) => {
  var sql = "SELECT * FROM articles";
  connection.query(sql, function (err, result) {
    if (!err)
      res.status(200).json(result);
    else {
      res.status(500).json(err);
    }
  });
});

module.exports = router;