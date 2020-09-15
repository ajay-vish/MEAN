const express = require('express');
const router = express.Router();
const Answer = require('../models/answer');
const Question = require('../models/question');

router.post('/', (req, res, next) => {
    let newAnswer = new Answer({
      answer: req.body.answer,
      description: req.body.description,
      user: req.body.user,
      username: req.body.username,
      question: req.body.question
      });
    
      Answer.addAnswer(newAnswer, (err, answer) => {
        if(err){
          res.json({success: false, msg:'Failed to insert answer', err:err});
        } else {
          Question.newAnswerAdded(answer.question, answer._id, (err, que) => {
            res.json({success: true, msg:'Answer Successfully added',answer: answer, question: que});
          });
        }
      });
});

router.get('/', (req, res, next) => {
  Answer.getAnswers((err, answers) => {
    if(err) throw err;
    res.json(answers);
  });
});

router.get('/:a_id', (req, res, next) => {
  Answer.getAnswerById(req.params.a_id, (err, answer) => {
    if(err) throw err;
    res.json(answer);
  });
});

router.delete('/:a_id', (req, res, next) => {
  var id = req.params.a_id;
  Answer.deleteAnswer(id, (err, answer) => {
    if(err) throw err;
    if(answer){
      res.json({
        success: true,
        msg: "Answer has been deleted"
      });
    }else{
      res.json({
        success: false,
        msg: "No answers for the given ID"
      });
    }
  });
});

router.patch('/:a_id', (req, res, next) => {
  const id = req.params.a_id;
  const answer = req.body;
  Answer.updateAnswer(id, answer, (err, answer) => {
    if(err) throw err;
    if(answer){
      res.json({
        success: true,
        msg: "Answer has been updated",
        answer: answer
      });
    }else{
      res.json({
        success: false,
        msg: "No answers for the given ID"
      });
    }
  });
});

router.patch('/vote/:id', (req, res, next) => {
  const id = req.params.id;
  const user = req.body.user;
  const action = req.body.action;
  
  if(action == "upvote"){
    Answer.upvote(id, user, (err, answer) => {
      if(err) throw err;
      res.json(answer);
    });
  }else if(action == "downvote"){
    Answer.downvote(id, user, (err, answer) => {
      if(err) throw err;
      res.json(answer);
    });
  }
  if(action == "pull_upvote"){
    Answer.pull_upvote(id, user, (err, answer) => {
      if(err) throw err;
      res.json(answer);
    });
  }else if(action == "pull_downvote"){
    Answer.pull_downvote(id, user, (err, answer) => {
      if(err) throw err;
      res.json(answer);
    });
  }
});

module.exports = router;
