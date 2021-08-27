var express = require('express');
var router = express.Router();
var app = require('../app.js');

// adds tables if don't exit

router.get('/',  function(req, resp, next) {
  console.log("adding dummy data");
  
  app.pool.query(`create table users (  
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    UNIQUE(email)
  )
  `, function(err, res){
    if (err){
      console.log(err);
      res.end(`ERROR ${err}`)
    }
    console.log(res.rows);
    app.pool.query(`INSERT INTO users (name,email,password)
    VALUES ($1,$2,$3)`,['john','john@gmail.com','122'], function(err,res){
      //res.redirect('dashboard');
      // create playlist

      app.pool.query(`CREATE TABLE playlists ( 
        playlist_id serial PRIMARY KEY,
        playlist_name VARCHAR(50) NOT NULL,
        owner integer REFERENCES users (id)
      )`, function(err, res){
        if (err){
          console.log(err);
          res.end(`ERROR ${err}`)
        }
        app.pool.query(`CREATE TABLE videos( 
          video_id serial NOT NULL PRIMARY KEY, 
          youtube_link_id VARCHAR(11) NOT NULL , 
          video_title VARCHAR(255), 
          playlist_id integer REFERENCES playlists (playlist_id)  ON DELETE CASCADE, 
          owner integer REFERENCES users (id)  ON DELETE CASCADE
        )`, function(err, res){
          if (err){
            console.log(err);
            res.end(`ERROR ${err}`)
          }
          app.pool.query(`CREATE TABLE notes(
            note_id SERIAL PRIMARY KEY,
            video_id integer NOT NULL REFERENCES videos (video_id) ON DELETE CASCADE,
            time_stamp varchar(25),
            note text,   
            owner integer REFERENCES users (id)
            )`, function(err, res){
            if (err){
              console.log(err);
              res.end(`ERROR ${err}`)
            }
    
    
            resp.redirect('dashboard');
              
          });

            
        });

          
      });

      
    });

      
  });
  
});


module.exports = router;
