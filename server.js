const path = require('path');
const express = require('express');
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

var storage = multer.memoryStorage()
var upload = multer({ storage: storage });

app.post('/', upload.single('file'), (req, res) => {
  res.json(req.file);
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Server listening at", process.env.IP + ":" + process.env.PORT);
});
