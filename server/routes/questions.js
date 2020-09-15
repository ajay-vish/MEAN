const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const User = require('../models/user');
const Answer = require('../models/answer');


router.post('/', (req, res, next) => {
    let newQuestion = new Question({
        question: req.body.question,
        description: req.body.description,
        user: req.body.user,
        tags: req.body.tags
      });
    
      Question.addQuestion(newQuestion, (err, question) => {
        if(err){
          res.json({success: false, msg:'Failed to insert question'});
        } else {
          res.json({success: true, msg:'Question Successfully added',question: question});
        }
      });
});


router.get('/', (req,res,next) => {
  Question.getQuestions((err, question) => {
    if(err) throw err;
    res.json(question);
  });
});

router.get('/:QuestionID', (req,res,next) => {
  var id = req.params.QuestionID;

  Question.getQuestionById(id, (err, question) => {
    if(err) throw err;
    res.send(question);
  });
});

router.delete('/:QuestionID', (req, res, next) => {
  var id = req.params.QuestionID;
  Question.deleteQuestion(id, (err, question) => {
    if(err) throw err;
    if(question){
      res.json({
        success: true,
        msg: "Question has been deleted"
      });
    }else{
      res.json({
        success: false,
        msg: "No Question for the given ID"
      });
    }
  });
});

router.patch('/watch/:QuestionID', (req, res, next) => {
  const id = req.params.QuestionID;
  const user_id = req.body.user_id;
  const action = req.body.action;
  if(action == 'start'){
    Question.watch(id, user_id, (err, question) => {
      if(err) throw err;
      if(question){
        res.json({
          success: true,
          msg: "Watching",
          question: question
        })
      }else{
        res.json({
          success: false,
          msg: "No Question for the given ID"
        });
      }
    });
  }else if(action == 'stop'){
    Question.stop_watching(id, user_id, (err, question) => {
      if(err) throw err;
      if(question){
        res.json({
          success: true,
          msg: "Stopped",
          question: question
        })
      }else{
        res.json({
          success: false,
          msg: "No Question for the given ID"
        });
      }
    });
  }
});

router.patch('/:QuestionID', (req, res, next) => {
  var id = req.params.QuestionID;
  var question = req.body;
  Question.updateQuestion(id, question, (err, question) => {
    if(err) throw err;
    if(question){
      res.json({
        success: true,
        msg: "Question has been updated",
        question: question
      });
    }else{
      res.json({
        success: false,
        msg: "No Question for the given ID"
      });
    }
  });
});

module.exports = router;
