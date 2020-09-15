const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Question = require('../models/question');
const Answer = require('../models/answer');
const Admin = require('../models/admin');

// router.post('/register', (req, res, next) => {
//   let newAdmin = new Admin({
//     username: req.body.username,
//     password: req.body.password
//   });
//   Admin.registerAdmin(newAdmin, (err, admin) => {
//     if(err){
//       res.json({success: false, admin: admin, msg:'Failed to register admin'});
//     } else {
//       res.json({success: true,  admin: admin, msg:'Admin registered'});
//     }
//   });
// });

router.get('/reported', (req, res, next) => {
  Question.getQuestions((err, questions) => {
    Answer.getAnswers((err, answers) => {
      User.getUser((err, users) => {
        res.json({
          user: users,
          question: questions,
          answer: answers
        })
      })
    })
  })
});

router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  Admin.getAdminByUsername(username, (err, admin) => {
    if(err) throw err;
    if(!admin){
      return res.json({success: false, msg: 'Admin not found'});
    }

    Admin.comparePassword(password, admin.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(admin.toJSON(), config.secret, {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          admin: admin
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});x
      }
    });
  });
});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json(req.user);
});

router.get('/dashboard', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const admin = req.user;
  Question.getQuestions((err, question) => {
    if(err) throw err;
    Answer.getAnswer((err, answer) => {
      if(err) throw err;
      res.json({
        admin: admin,
        question: question,
        answer: answer
      });
    });
  });
});

module.exports = router;
