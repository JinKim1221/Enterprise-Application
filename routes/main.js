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


router.post('/main/add-post',function(req, res, next){
  console.log(req.body);
})

module.exports = router;
