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
  res.render('landing');
});

router.get('/register', function(req,res, next) {
  res.render('auth');
})


router.post('/user/register', function(req,res,next){
  var hash = bcrypt.hashSync(req.body.password, 8);
  knex('users')
  .insert({'username': req.body.username.toLowerCase(), 'password': hash})
  .then(function(response){
    res.redirect('/');
  })
});

router.get('/login', function(req, res, next){
res.render('login')
})

router.post('/user/login', function(req,res,next){
  knex('users')
  .where('username', '=', req.body.username.toLowerCase())
  .first()
  .then(function(response){
    if(response && bcrypt.compareSync(req.body.password, response.password)){
      res.redirect('/home');
    } else {
      res.render('login', {error: 'Invalid username or password'});
    }
  });
});

router.get('/logout', function(req,res,next){
  res.clearCookie('session');
  res.clearCookie('session.sig');
  req.session.user = null;
  res.redirect('/');
});

router.get('/home', function(req,res,next){
  res.render('home');
});

module.exports = router;
