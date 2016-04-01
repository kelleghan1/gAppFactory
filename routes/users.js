var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/current/:id', function(req, res, next) {
  if(req.params == req.body){
    console.log(req.params);
  res.send('successful ventures');
}
else if(req.params == req.body){
  console.log(req.params);
res.send('respond with a resource');
}
});
module.exports = router;
