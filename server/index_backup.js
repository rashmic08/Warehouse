/*const express = require('express');
const cors = require('cors');
const multer = require('multer');
var fs = require('fs')

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'Test@123',
  database: 'warehouse'
});

app.post('/create', (req, res) => {
  const name = req.body.name;
  const id = 1;
  db.query("INSERT INTO products (id, name) VALUES (?, ?)", [id, name], (err, result) => {
    if (err) {
      console.log("error--", err);
    } else {
      res.send("Values inserted");
    }
  })
});

app.get('/products', (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log("error--", err);
    } else {
      res.send(result);
    }
  })
});
var actual = [];
function objectToArray(obj) {
  var array = []
  var obj_keys = Object.keys(obj).sort()
  for (var i = 0; i < obj_keys.length; i++) {
    array.push(obj[obj_keys[i]])
  }
  return array
}

app.post('/uploadfile', upload.single('file'), function (req, res) {
  console.log("req.file--->", req.file.path);
  if (!req.file) {
    console.log("No file upload");
  } else {
    console.log(req.file)

    fs.readFile(req.file.path, 'utf8', function (err, data) {
      if (err) {
        return console.error(err);
      }
      const jsonData = JSON.parse(data)
      jsonData.inventory.map(function (object) {
        actual.push(objectToArray(object))
      })
      var sql = "INSERT INTO articles (id, name, in_stock) VALUES ?";
      db.query(sql, [actual], function (err) {
        if (err) throw err;
      });
    });
  }

  res.send("file saved on server");
});
*/
