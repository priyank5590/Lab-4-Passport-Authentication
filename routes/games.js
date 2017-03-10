let express = require('express');
let router = express.Router();

// reference Game model for CRUD
let Game = require('../models/game');

// auth
let passport = require('passport');

function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next();  // user has logged in already so continue to the next function
   }
   res.redirect('/login');
}

/* GET games index page */
router.get('/', function(req, res, next) {

   // use the model to query the games collection in mongodb
   Game.find(function(err, games) {
      if (err) {
         console.log(err);
         res.end(err);
         return;
      }
      // load the view and pass the games data to it
      // console.log(games);
      res.render('games/index', {
         games: games,
         title: 'Video Game Library',
          user: req.user
      });
   });
});

// GET /games/add - show the empty form
router.get('/add', isLoggedIn, function(req, res, next) {
   res.render('games/add', {
      title: 'Add a New Game',
       user: req.user
   });
});

// POST /games/add - process form submission
router.post('/add', isLoggedIn, function(req, res, next) {
   // use our Game model to add a new Game document to mongodb
   Game.create({
      title: req.body.title,
      developer: req.body.developer,
      genre: req.body.genre,
      year: req.body.year
   },function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      // no error so show updated games list
      res.redirect('/games');
   });
});

// GET /games/delete/_id - delete the selected game
router.get('/delete/:_id', isLoggedIn, function(req, res, next) {
   // delete game and redirect
   Game.remove({ _id: req.params._id }, function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      // no error so show updated games list
      res.redirect('/games');
   });
});

// GET /games/_id - show edit form
router.get('/:_id', isLoggedIn, function(req, res, next) {
   // look up the selected game
   Game.findById(req.params._id, function(err, game) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.render('games/edit', {
         game: game,
         title: 'Edit Video Game',
          user: req.user
      });
   });
});

// POST /games/_id - save updates
router.post('/:_id', isLoggedIn, function(req, res, next) {
   // create an fill a Game object
   let game = new Game({
      _id: req.params._id,
      title: req.body.title,
      developer: req.body.developer,
      genre: req.body.genre,
      year: req.body.year
   });

   // call Mongoose's Update method, passing the id and the updated game object
   Game.update({ _id: req.params._id }, game, function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.redirect('/games');
   });
});

// make public
module.exports = router;