var passport = require('passport');
var User = require('../models/user');
var express = require('express');
var router = express.Router();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;



router.route('/register')
  // .get(function(req, res, next) {
  //   res.render('register', {});
  // })
  .post(function(req, res, next) {
    User.register(new User({username: req.body.username,
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email
                            }), req.body.password, function(err, account) {
      if(err) {
        console.log(err)
        // var eArr = [];
        // for(var e of Object.keys(err.errors)){ 
        //     eArr.push(e);
        // }
        // return res.render('register', {account: account, error:err.errors[eArr[0]].message});
        // return res.render('register', {account: account, error:err});
      }

      req.login(account, function(err) {
        // console.log(account.username)
        
        if(err){
          res.send({error:err})
        }
        res.send({message:account})
        // .json({
        //   account
        // });     
        // res.redirect('/');
      });
    })
  })
router.get('/log-in', function(req, res, next) {
  // res.render('log-in', {user: req.user});

});

// router.get('/', function(req, res, next) {
//   res.render('index')

// });

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { 
//         console.log(err);
//         return res.render('login', {error:err}); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));


// router.post('/login',
//   passport.authenticate('local', { failureRedirect: '/auth/log-in'}),
//   function(req, res) {
//     res.redirect('/');
//   });

router.post('/login', function(req, res, next) {
  User.authenticate()(req.body.username, req.body.password,(err, user, options)=>{
    if (err) return res.status(500).json({
      success:false,
      title:'Error',
      response:err
    });
    if (user === false) {
      return res.json({
        success: false,
        title: 'Error',
        response: options.message,
      });
    } else {
        req.login(user,(err)=>{
           if (err) return res.status(500).json({
            success:false,
            title:'Error',
            response:err
          });
          console.log(req.user);
          res.status(200).json({
            success: true,
            title: 'Success',
            response: user,
            redirect:'/todo'
          });
        });
      }
  });
});

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;