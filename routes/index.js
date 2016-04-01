
'use strict';
// var bcrypt = require('bcryptjs');

var express = require('express');
var router = express.Router();
// const knex = require('../db/knex');
var bcrypt = require('bcrypt');
var Users = function() { return knex('users') };
var knex = require('knex')(require('../knexfile')['development']);






router.get('/register', function(req, res, next) {
  res.render('auth');
});


router.post('/user/register', function(req, res, next) {
  Users().where({
    username: req.body.username
  }).first().then(function(user) {
    if (user == null) {
      var hash = bcrypt.hashSync(req.body.password, 10);
      Users().insert({
        username: req.body.username,
        password: hash
      }).then(function(){
        res.redirect('/');
      });
    } else {
      res.redirect('/users/login');
    }
  });
});

router.post('/user/login', function(req, res, next) {
  knex('users')
.where('username', '=', req.body.username)
.first()
.then(function(response){
  if(response && bcrypt.compareSync(req.body.password, response.password)){

    //LOOK HERE: Notice we set req.session.user to the current user before redirecting
    req.session.user = response.username;
    console.log(response.username);
    console.log(req.session.user);
    console.log()
    res.render('home', {user: req.session.user});
  } else {
    res.render('login', {error: "Invalid Credentials"});
  }
});
});


// router.post('/user/login', function(req,res,next){
//   knex('users')
//   .where('username', '=', req.body.username.toLowerCase())
//   .first()
//   .then(function(response){
//     let salt = bcrypt.genSaltSync(10);
//     if(response && bcrypt.compareSync(req.body.password, response.password)){
//       res.redirect('/home');
//     } else {
//       res.render('login', {error: 'Invalid username or password'});
//     }
//   });
// });




//check if a user session is active and call next() if there is a user session,
//or redirect back to '/' if there is no session.
function authorizedUser(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('login');
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});

// router.get('/register', function(req,res,next) {
//   res.render('auth')
// });





router.get('/users/login', function(req,res,next) {
  res.render('login')
});



router.get('/logout', function(req,res,next){
  res.clearCookie('session');
  res.clearCookie('session.sig');
  req.session.user = null;
  res.redirect('/');
});

router.get('/home',authorizedUser, function(req,res,next){
  res.render('home');
});

module.exports = router;
