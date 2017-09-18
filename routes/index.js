var express = require('express');
var router = express.Router();
var fs = require('fs');

function readUsers() {

  var dataString = fs.readFileSync('public/data.txt').toString();

  if(dataString == '' || dataString == null || dataString == undefined)
    return [];

  return dataString.split(',');
}

function writeUsers(dataArr) {

  fs.writeFileSync('public/data.txt', dataArr);

}

// Display User List
router.get('/', function(req, res, next) {

  var dataArr = readUsers();

  var users = dataArr.map( user => {
    var splittedName = user.split(' ');
    return {
      firstname: splittedName[0],
      lastname: splittedName[1]
    }
  });

  res.render('index', { users, title: 'User List' })

});




// Create User
router.get('/createUser', function(req, res) {

  res.render('createUser', { title: 'Create User' });

});

router.post('/createUser', function(req, res) {

  var firstname = req.body.firstname;
  var lastname = req.body.lastname;

  var dataArr = readUsers();

  dataArr.push(firstname + ' ' + lastname);

  writeUsers(dataArr);

  res.redirect('/');

});

module.exports = router;
