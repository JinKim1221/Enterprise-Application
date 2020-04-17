//#region /* Mongo DB */
let UserModel = require('../database/users.model');
const mongoose = require('mongoose');
const User = mongoose.model('users');
//#endregion
var app = require('../app.js');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/main', function(req, res, next) {
  user_email = req.session.email;
  console.log("main router================= main")
  User.findOne({user_email : user_email}, function(err, doc){
      res.render('main',{ title:'YouStar',
                              username : doc.user_fullname,
                              post_info : doc.user_posts
                            });    
  });
});

router.get('/main/read_more',(req, res)=>{
  user_email = req.session.email;
  if(req.session.email) {
    console.log("main router================= post info")
    // console.log(req.query)
    post_id = req.query.post_id;
    
    User.findOne( {user_email : user_email} ,function(err, doc){
      // console.log(doc)
      post_arr = [];
      posts = doc.user_posts;
      a_post = posts.filter(obj => {
        return obj._id == post_id;
      });

      console.log(a_post);
      // res.send(a_post[0].post_title +" : "+ a_post[0].post_content);  
      res.render('post',{
        title:'YouStar',
        post_info : doc.user_posts,
        post : a_post[0]
      }); 
    });

  }
  else{
    res.render('login',{
      title:'YouStar'
    });
  }
});

router.get('/main/edit-post',(req, res)=>{

  user_email = req.session.email;
  if(req.session.email) {

    console.log("main router================= post edit ")
    post_id = req.query.post_id;

    User.findOne( {user_email : user_email} ,function(err, doc){
      post_arr = [];
      posts = doc.user_posts;
      a_post = posts.filter(obj => {
        return obj._id == post_id;
      });
      
      console.log("here in findOne")
      res.render('edit',{
        title:'YouStar',
        post : a_post[0],
      });

    });
  }
  else{
    res.render('login',{
      title:'YouStar'
    });
  }
});

router.post('/main/edit-post', (req, res)=>{

  user_email = req.session.email;
  if(req.session.email) {

    console.log("main router================= post edit=post")
    post_id = req.query.post_id;
    console.log(req.body);
    User.findOne( {user_email : user_email} ,function(err, doc){
     
      posts = doc.user_posts;
      a_post = posts.filter(obj => {
        return obj._id == post_id;
      });
      post = { 
                post_title : req.body.post_title,
                 post_content : req.body.post_content
              };

      posts.remove(a_post[0]);
      posts.push(post);
      
      User.update({user_email : user_email},{user_posts : posts}, function(err, doc)
      {
        console.log(doc);
      })

      console.log("here in findOne")
      res.render('main',{
        title:'YouStar',
        post_info : posts,
      });


    });
  }
  else{
    res.render('login',{
      title:'YouStar'
    });
  }

})

router.get('/main/delete-post',(req, res)=>{

  user_email = req.session.email;
  if(req.session.email) {
    console.log("main router================= post delete ")
    post_id = req.query.post_id;

    User.findOne( {user_email : user_email} ,function(err, doc){
      post_arr = [];
      posts = doc.user_posts;
      a_post = posts.filter(obj => {
        return obj._id == post_id;
      });
      
      posts.remove(a_post[0]);

      User.update({user_email : user_email},{user_posts : posts}, function(err, doc)
      {
        console.log(doc);
      })

      res.render('main',{
        title:'YouStar',
        post_info : posts,
      });

    });
  }
  else{
    res.render('login',{
      title:'YouStar'
    });
  }
});

router.post('/main/add-post',function(req, res, next){
  user_email = req.session.email;
  var user_post = {
                    post_title : req.body.post_title,
                    post_content : req.body.post_content,
                  };

  User.findOne({user_email : user_email}, function(err, doc){
    if(err){
      console.log(err);
    }
    else{
      
      console.log("main router================= main/add-post")     
      posts = doc.user_posts;
      posts.push(user_post);
        
      return doc.save((err, doc)=>{  
              console.log("You Saved Up Successfully");
              res.render('main',{ 
                                  title:'YouStar',
                                  username : doc.user_fullname,
                                  post_info : posts
                                });
            });
    }
  })
});

router.get('/main/add-post', function(req, res, next){

  sessionEmail = req.session.email;

  if(req.session.email) {
    User.findOne({user_email:sessionEmail}, function(err, resp){
      res.render('main',{
        title:'YouStar'
      });
      
    });
  }else{
    res.render('login',{
      title:'YouStar'
    });
  }

});

module.exports = router;
