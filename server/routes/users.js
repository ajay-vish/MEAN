const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Question = require('../models/question');
const Answer = require('../models/answer');

// Register

router.get('/', (req, res, next) => {
  User.getUser((err, users) => {
    return res.json(users);
  })
});

router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  let username = req.body.username;
  User.getUser((err, users) => {
    for(let i = 0; i < users.length; i++){
      if(users[i].username == username){
        return res.json({success: false, msg: 'Username already exists'});
      }
    }
    User.addUser(newUser, (err, user) => {
      if(err){
        res.json({success: false, msg:'Failed to register user'});
      } else {
        res.json({success: true, msg:'User registered'});
      }
    });
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    if(user.admin_action == 'Disable'){
      return res.json({success: false, msg: user.admin_action_comment});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

router.get('/profile/:id', (req, res, next) => {
  const id = req.params.id;
  User.getUserById(id, (err,user) => {
    if(err) throw err;
    Question.getQuestionByUId(user._id, (err,question) => {
      if(err) throw err;
      Answer.getAnswerByUId(user._id, (err,answer) => {
        if(err) throw err;
        res.json({
          user:user,
          question:question,
          answer:answer
        });
      });
    });
  });
});

router.get('/:username', (req, res, next) => {
  const username = req.params.username;
  console.log(username);
  User.getUserByUsername(username, (err,user) => {
    if(err) throw err;
    Question.getQuestionByUId(user._id, (err,question) => {
      if(err) throw err;
      Answer.getAnswerByUId(user._id, (err,answer) => {
        if(err) throw err;
        res.json({
          user:user,
          question:question,
          answer:answer
        });
      });
    });
  });
});

router.patch('/like/:id', (req, res, next) => {
  const id = req.params.id; //user_id
  const liked_id = req.body.liked_id; //question_id/answer_id/user_id
  const action = req.body.action;
  
  if(action == "u_like"){
    User.user_liked1(liked_id, id, (err, liked_id) => {
      if(err) throw err;
    });
    User.user_liked(id, liked_id, (err, liked_id) => {
      if(err) throw err;
      res.json(liked_id);
    });
  }else if(action == "u_dislike"){
    User.user_disliked1(liked_id, id, (err, liked_id) => {
      if(err) throw err;
    });
    User.user_disliked(id, liked_id, (err, liked_id) => {
      if(err) throw err;
      res.json(liked_id);
    });
  }else if(action == "q_like"){
    User.question_liked(id, liked_id, (err, user) => {
      if(err) throw err;
      Question.question_liked(liked_id, id, (err, question) => {
        if(err) throw err;
        res.json({
          user: user,
          question:question
        });
      });
    });
  }else if(action == "q_dislike"){
    User.question_disliked(id, liked_id, (err, user) => {
      if(err) throw err;
      Question.question_disliked(liked_id, id, (err, question) => {
        if(err) throw err;
        res.json({
          user: user,
          question:question
        });
      });
    });
  }
  else if(action == "a_like"){
    User.answer_liked(id, liked_id, (err, user) => {
      if(err) throw err;
      Answer.answer_liked(liked_id, id, (err, answer) => {
        if(err) throw err;
        res.json({
          user: user,
          answer: answer
        });
      });
    });
  }else if(action == "a_dislike"){
    User.answer_disliked(id, liked_id, (err, user) => {
      if(err) throw err;
      Answer.answer_disliked(liked_id, id, (err, answer) => {
        if(err) throw err;
        res.json({
          user: user,
          answer: answer
        });
      });
    });
  }
});

router.patch('/report/:id', (req, res, next) => {
  const id = req.params.id; //user_id
  const reported_id = req.body.reported_id; //question_id/answer_id/user_id
  const action = req.body.action;

  if(action == "u_report"){
    User.user_reported(id, reported_id, (err, user) => {
      if(err) throw err;
      res.json(user);
    });
  }else if(action == "u_withheld"){
    User.user_withheld(id, reported_id, (err, user) => {
      if(err) throw err;
      res.json(user);
    });
  }else if(action == "q_report"){
    Question.question_reported(reported_id, id, (err, question) => {
      if(err) throw err;
      res.json({
        question: question
      });
    });
  }else if(action == "q_withheld"){
    Question.question_withheld(reported_id, id, (err, question) => {
      if(err) throw err;
      res.json({
        question:question
      });
    });
  }
  else if(action == "a_report"){
    Answer.answer_reported(reported_id, id, (err, answer) => {
      if(err) throw err;
      res.json({
        answer:answer
      });
    });
  }else if(action == "a_withheld"){
    Answer.answer_withheld(reported_id, id, (err, answer) => {
      if(err) throw err;
      res.json({
        answer:answer
      });
    });
  }
});

router.patch('/profile/:id', (req, res, next) => {
  const id = req.params.id;
  const user = req.body;
  User.updateUser(id, user, (err, user) => {
    if(err) throw err;
    res.json(user);
  });
});

router.delete('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const id = req.user._id;
  User.deleteUser(id, (err, user) => {
    if(err) throw err;
    if(user){
      res.json({
        msg: "User Deleted"
      });
    }else{
      res.json({
        msg: "No user with given ID"
      });
    }
  });
});

router.get('/dashboard', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const id = req.body._id;
  Question.getQuestionByUId(id, (err,question) => {
    if(err) throw err;
    Answer.getAnswerByUId(id, (err, answer) => {
      if(err) throw err;
      res.json({
        user: req.user,
        question: question,
        answer: answer
      });
    });
  });
});

module.exports = router;
