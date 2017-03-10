var express = require('express');
var router = express.Router();

let Account = require('../models/account');

//auth check
function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next(); 
   }
   res.redirect('/login');
}

// use the model to query the users collection in mongodb
router.get('/', isLoggedIn, function(req, res, next) {
  Account.find(function(err, users) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    else {
      // load the users page
      res.render('users', {
        title: 'User List',
        users: users,
        user: req.user
      });
    }
  });
});

module.exports = router;