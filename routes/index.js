var express = require('express');
var router = express.Router();

var knex = require('knex')(require('../knexfile')['development']);
var bcrypt = require('bcryptjs');

//check if a user session is active and call next() if there is a user session,
//or redirect back to '/' if there is no session.
function authorizedUser(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('auth');
});

router.post('/user/register', function(req,res,next){

  var hash = bcrypt.hashSync(req.body.password, 8);
  knex('users')
  .insert({'username': req.body.username.toLowerCase(), 'password': hash})
  .then(function(response){
    res.redirect('/');
  })

});

router.post('/user/login', function(req,res,next){
  knex('users')
  .where('username', '=', req.body.username.toLowerCase())
  .first()
  .then(function(response){
    if(response && bcrypt.compareSync(req.body.password, response.password)){
      res.redirect('/home');
    } else {
      res.render('auth', {error: 'Invalid username or password'});
    }
  });
});

router.post('/user/login', function(req,res,next){
  knex('users')
  .where('username', '=', req.body.username.toLowerCase())
  .first()
  .then(function(response){
    if(response && bcrypt.compareSync(req.body.password, response.password)){

      //LOOK HERE: Notice we set req.session.user to the current user before redirecting
      req.session.user = response.username;

      res.redirect('/home');
    } else {
      res.render('auth', {error: 'Invalid username or password'});
    }
  });
});

router.get('/logout', function(req,res,next){
  req.session.user = null;
  res.clearCookie('session');
  res.clearCookie('session.sig');
  res.redirect('/');
});

router.get('/home', function(req,res,next){
  res.render('home');
});

router.post('/user/register', function(req,res,next){

});

router.post('/user/login', function(req,res,next){

});

module.exports = router;
