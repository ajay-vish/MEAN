const mongoose = require('mongoose');
const User = require('./user');
const Answer = require('./answer');

const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'User'
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer' 
  }],
  likedby: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reportedby: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  watching: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type:Number,
    default:0
  },
  admin_action: {
    type: String,
    default: 'Enabled'
  },
  admin_action_comment: {
    type: String,
    default: null
  },
  tags : [{
    item_id: {
      type: Number
    },
    item_text: {
      type: String
    },
  }],
  created_at: {
    type: Date,
    required: true,
    default: Date.now 
  }
});

const Question = module.exports = mongoose.model('Question', QuestionSchema);

module.exports.addQuestion = function(newQuestion, callback){
  newQuestion.save(callback);
}

module.exports.getQuestionById = function(id, callback){
  Question.findById(id, callback).populate('answers').populate('user');
}

module.exports.getQuestionByUId = function(u_id, callback){
  Question.find({user: u_id}, callback);
}

module.exports.getQuestions = function(callback){
  Question.find({}, callback).populate('user').populate('answers');
}

module.exports.deleteQuestion = function(id, callback){
  Question.findOneAndDelete({_id:id}, callback);
}

module.exports.updateQuestion = function(id, updateOps, callback){
  Question.findOneAndUpdate({_id: id}, {$set: updateOps}, {new: true}, callback);
}

module.exports.newAnswerAdded = function(id, a_id, callback){
  Question.findOneAndUpdate({_id:id}, { $push: { answers: a_id}}, {new: true}, callback);
}

module.exports.question_liked = function(id, like_by, callback){
  Question.findOneAndUpdate({_id:id}, { $push: {likedby: like_by}}, {new: true}, callback);
}

module.exports.question_disliked = function(id, like_by, callback){
  Question.findOneAndUpdate({_id:id}, { $pull: {likedby: like_by}}, {new: true}, callback);
}

module.exports.question_reported = function(id, reported_id, callback){
  Question.findOneAndUpdate({_id:id}, { $push: {reportedby: reported_id}}, {new: true}, callback);
}

module.exports.question_withheld = function(id, reported_id, callback){
  Question.findOneAndUpdate({_id:id}, { $pull: {reportedby: reported_id}}, {new: true}, callback);
}

module.exports.watch = function(id, user_id, callback){
  Question.findOneAndUpdate({_id:id}, { $push: {watching: user_id}}, {new: true}, callback);
}

module.exports.stop_watching = function(id, user_id, callback){
  Question.findOneAndUpdate({_id:id}, { $pull: {watching: user_id}}, {new: true}, callback);
}