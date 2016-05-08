const http = require('http');
const path = require('path');
const express = require('express');
const multer = require("multer");
const mime = require("mime");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index');
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if(err) console.log(err);
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({ storage: storage });

app.post('/', upload.single('file'), (req, res) => {
  res.json(req.file);
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Server listening at", process.env.IP + ":" + process.env.PORT);
});
