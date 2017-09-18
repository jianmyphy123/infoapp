var express = require('express');
var router = express.Router();
var fs = require('fs');

function readUsers() {

  var dataString = fs.readFileSync('public/data.txt').toString();

  if(dataString == '' || dataString == null || dataString == undefined)
    return [];

  return dataString.split(',');
}

function writeUsers(users) {

  fs.writeFileSync('public/data.txt', users);

}

// Display User List
router.get('/', function(req, res, next) {

  var users = readUsers();

  var users = users.map( user => {
    var names = user.split(' ');
    return {
      firstname: names[0],
      lastname: names[1]
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

  var users = readUsers();

  users.push(firstname + ' ' + lastname);

  writeUsers(users);

  res.redirect('/');

});



// Update User

router.get('/updateUser/:username/:number', function(req, res) {

  var username = req.params.username;
  var number = req.params.number;

  var names = username.split(' ');

  var user = {
    firstname: names[0],
    lastname: names[1],
    number
  };

  res.render('updateUser', { user, title: 'Update User'});

});

router.post('/updateUser', function(req, res) {

  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var number = req.body.number;

  var username = firstname + ' ' + lastname;

  var users = readUsers();

  users[number] = username;

  writeUsers(users);

  res.redirect('/');

});




// Delete User

router.get('/deleteUser/:number', function(req, res) {

  var number = req.params.number;

  var users = readUsers();
  users.splice(number, 1);

  writeUsers(users);

  res.redirect('/');

});
module.exports = router;
