/* Роутер, выдающий токен на основе логина и пароля пользователя */

var express = require('express');
var sha1 = require('../cryptography/sha1');
var JWT = require('../cryptography/jwt');
var router = express.Router();
var isAuth = require('../controllers/auth');
var User = require('../models/users')

router.post('/', function(req, res) {
  var username = req.body.username;
  var password = sha1(req.body.password);

  User.findOne({username: username}, (err, user)=>{
    if(err){
      //TODO err handler;
    } else {
      // check if incoming password and password from db same
      // i mean, password hashes
      if(!(password === user.password)){
        //TODO wrong password handler
      } else {
        var jwt = JWT.create_JWT(user);
        res.send({status: 'ok', jwt: jwt});
      }
    }
  })
});

module.exports = router;
