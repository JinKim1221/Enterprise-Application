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
  User.findOne({user_email:sessionEmail}, function(err, resp){
    console.log(sessionEmail + " is online? ");
    User.find({}, (err, resp_)=>{
      allPosts = [];
      for(let i=0; i<resp_.length; i++){
        for(let j=0; j<resp_[i].user_posts.length; j++){
          allPosts.push(resp_[i].user_posts[j]);
        }
      }      

      res.render('main',{
        title:'YouStar',
        username : resp.user_fullname,
        post_info : allPosts
      });
    })
  })
});

router.get('/main/favourite', (req, res)=>{
  user_email = req.session.email;

  if(req.session.email) {
    console.log("main router================= post info")
    // console.log(req.query)
    // post_id = req.query.post_id;
    
    User.findOne( {user_email : user_email} ,function(err, doc){
      res.render('favourite',{
        username : doc.user_fullname,
        title:'YouStar',
        post_info : doc.user_favourite,
      }); 
    });
  }
  else{
    res.render('login',{
      title:'YouStar'
    });
  }
})

favourite = [];
router.get('/main/add-favourite', (req, res)=>{
  user_email = req.session.email;
  if(req.session.email) {
    post_id = req.query.post_id;
    User.findOne({user_email:sessionEmail}, function(err, resp){
      User.find( {} ,function(err, doc){
        // console.log(doc)
        allPosts = [];
        for(let i=0; i<doc.length; i++){
          for(let j=0; j<doc[i].user_posts.length; j++){
            allPosts.push(doc[i].user_posts[j]);
          }
        }  
        a_post = allPosts.filter(obj => {
          return obj._id == post_id;
        });
        
        favourites = resp.user_favourite;
   
        favourite_exists = favourites.some((test)=>{
          if(test.id == post_id){
            return true;
          }
          else{
            return false;
          }
        })
        if(!favourite_exists){
          resp.user_favourite.push(a_post[0]);
        }      

        return resp.save((err, doc)=>{  
          console.log("You Saved Up Successfully");
          res.redirect('/main');
        });

      });
    });
  }
  else{
    res.render('login',{
      title:'YouStar'
    });
  }
})

router.get('/main/remove-favourite', (req, res)=>{
  user_email = req.session.email;
  if(req.session.email) {
    post_id = req.query.post_id;
    User.findOne({user_email:user_email}, function(err, resp){
 
        allPosts = resp.user_favourite;

        a_post = allPosts.filter(obj => {
          return obj._id == post_id;
        });
        console.log(a_post[0]);

        allPosts.remove(a_post[0]);
        
        User.update({user_email : user_email},{user_favourite : allPosts}, (err, doc)=>{})
        res.render('favourite',{
          username : resp.user_fullname,
          title:'YouStar',
          post_info : resp.user_favourite,
        }); 
        
    });
  }
  else{
    res.render('login',{
      title:'YouStar'
    });
  }
})





router.get('/main/read_more/private',(req, res)=>{
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
        username : doc.user_fullname,
        private : 'private',
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


router.get('/main/read_more/public',(req, res)=>{
  user_email = req.session.email;
  if(req.session.email) {

    post_id = req.query.post_id;
    User.findOne({user_email:sessionEmail}, function(err, resp){
      User.find( {} ,function(err, doc){
        // console.log(doc)
        allPosts = [];
        for(let i=0; i<doc.length; i++){
          for(let j=0; j<doc[i].user_posts.length; j++){
            allPosts.push(doc[i].user_posts[j]);
          }
        }  

        a_post = allPosts.filter(obj => {
          return obj._id == post_id;
        });

        console.log("===========================read more from public "+ a_post);
        
        res.render('post',{
          username : doc.user_fullname,
          title:'YouStar',
          post : a_post[0]
        }); 
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
      post = posts.filter(obj => {
        return obj._id == post_id;
      });
      
      console.log("here in findOne")
      res.render('edit',{
        username : doc.user_fullname,
        title:'YouStar',
        post : post[0],
      });
    });
  }
  else{
    res.render('login',{
      title:'YouStar'
    });
  }
});

router.get('/ownBlog', (req, res)=>{
  console.log("hello, this is  .get(ownblog)")
  user_email = req.session.email;
  if(req.session.email) {
    User.findOne( {user_email : user_email} ,function(err, doc){

      posts = doc.user_posts;
      
      res.render('ownBlog',{
        username : doc.user_fullname,
        title:'YouStar',
        post_info : doc.user_posts,
        
      }); 
    });
  }
  else{
    res.render('login')
  }  
})

router.post('/main/search-post', (req, res)=>{

  user_email = req.session.email;
  if(req.session.email) {

    console.log("main router================= post search-post")
    // post_id = req.query.post_id;
    console.log(req.body);
    User.findOne( {user_email : user_email} ,function(err, doc){
     
      posts = doc.user_posts;
      searched_post = posts.filter(obj => {
        return obj.post_title == req.body.searching_post;
      });

      if(searched_post.length == 0){
        res.render('search_result',{
          username : doc.user_fullname,
          title:'YouStar',
          no_result : " Title not found "
        });
      }
      else{
        res.render('search_result',{
          username : doc.user_fullname,
          title:'YouStar',
          search_result : searched_post
        });
      }
      console.log(searched_post);


    });
  }
  else{
    res.render('login',{
      title:'YouStar'
    });
  }

})

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
      
      console.log(post);
      console.log(post);
      posts.remove(a_post[0]);
      posts.push(post);
      
      User.update({user_email : user_email},{user_posts : posts}, function(err, doc)
      {
        console.log(doc);
      })

      console.log("here in findOne")
      res.redirect('/main');
      
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
        username : doc.user_fullname,
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
              res.redirect('/main');
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
