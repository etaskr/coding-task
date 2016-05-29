var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.use(express.static('static'));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
