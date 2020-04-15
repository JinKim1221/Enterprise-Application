//#region /* Mongo DB */
let UserModel = require('../database/users.model');
const mongoose = require('mongoose');
const User = mongoose.model('users');
//#endregion

var express = require('express');
var router = express.Router();

require('./register');

//#region /* SESSION */
const session = require('express-session');
var sess ;

router.use(session({
  secret : 'secretCode',
  resave : false,
  saveUninitialized: true
})); 
//#endregion

/* GET home page. */
router.get('/', function(req, res, next) {
    // IF SESSION EXISTS
    // if(req.session){
    //   res.redirect('/main');
    // }
    // else{ // IF SESSION DOES NOT EXIST
      res.redirect('/login');
    // }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy((err) => {
    if(err){
      res.negotiate(err);
    }
    console.log(session.id + "destroyed");
  });
  res.redirect('/');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'YouStar' });
});

router.get('/main', function(req, res, next){
  res.render('main', { title : 'YouStar' });
})

/* USER SEND LOGIN INFO TO SERVER. */
router.post('/login_user',(req,res)=>{
  console.log(req.body);
  req.session.email = req.body.loginEmail;
  req.session.password = req.body.loginPw;

  FindUserInfo(req, res); 
})



function FindUserInfo(req, res){
  let loginEmail= req.body.loginEmail;
  let loginPw = req.body.loginPw;

  var validUser = User.findOne({user_email:req.body.loginEmail}, function(err, resp){
    if(resp == null){
      req.body.user_invalidAccountError = "Invalid email or password. Try again";

      req.session.err = 'Check your id or password'
      sess = loginEmail;
      return res.render('login',{
                  title:'YouStar',
                  users : req.body
                });

    }
    if(resp.user_email==loginEmail && resp.user_password == loginPw){
      console.log("Log in successful!");     
      return res.redirect('/main');
    }
    else if(resp.user_email !=loginEmail || resp.user_password != loginPw){

      req.body.user_invalidAccountError = "Invalid email or password. Try again";

      req.session.err = 'Check your id or password'
      sess = loginEmail;
      return res.render('login',{
                  title:'YouStar',
                  users : req.body
                });
    } 
      
  });
}

/* GET REGISTER PAGE. */
router.get('/register', function(req, res, next) {
  res.render("register",{
    title:'YouStar'});
});



module.exports = router;

