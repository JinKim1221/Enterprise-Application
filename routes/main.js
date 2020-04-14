//#region /* Mongo DB */
let UserModel = require('../database/users.model');
const mongoose = require('mongoose');
const User = mongoose.model('users');
//#endregion

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/main', function(req, res, next) {
  res.render('main', { title: 'YouStar' });
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


module.exports = router;
