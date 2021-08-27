var express = require('express');
var router = express.Router();
var app = require('../app.js');


router.post('/', function(req, res, next) {

  const { name } = req.body;
  const owner = req.user.id;
  const text = 'INSERT INTO playlists(playlist_name,owner) VALUES($1, $2)'

  app.pool.query(text, [name,owner], function(err, result){
    if (err){
      console.log(err)
      res.end("error");
    }
    else{
      res.redirect('dashboard');
    }
  })
  
});


module.exports = router;
