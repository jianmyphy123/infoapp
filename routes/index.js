var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res, next) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;

  var dataArr = fs.readFileSync('public/data.txt').toString().split(',');

  dataArr.push(firstname + ' ' + lastname);

  fs.writeFileSync('public/data.txt', dataArr);

  var data = fs.readFileSync('public/data.txt');

  console.log(data.toString());
});

module.exports = router;
