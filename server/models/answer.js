const mongoose = require('mongoose');
const User = require('./user');
const Question = require('./question');
const Notification = require('./notification');
const notification = require('./notification');
// User Schema
const AnswerSchema = mongoose.Schema({
  answer: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'User'
  },
  username: {
    type: String,
    required: true
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'Question'
  },
  vote: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvote: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  admin_action: {
    type: String,
    default: 'Enabled'
  },
  admin_action_comment: {
    type: String,
    default: null
  },
  adminremark: {
    type:Number,
    default:0
  },
  created_at: {
    type: Date,
    default: Date.now 
  },
  reportedby: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  likedby: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reportedby: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
});

const Answer = module.exports = mongoose.model('Answer', AnswerSchema);

module.exports.getAnswerByQId = function(q_id, callback){
  const query = {question: q_id}
  Answer.find(query, callback);
}

module.exports.getAnswers = function(callback){
  Answer.find({}, callback).populate('question').populate('user');
}

module.exports.getAnswerByUId = function(u_id, callback){
  const query = {user: u_id}
  Answer.find(query, callback);
}

module.exports.addAnswer = function(newAnswer, callback){
  Question.getQuestionById(newAnswer.question, (err, question) => {
    if(err) throw err;
    else{
      for(let i = 0; i < question.watching.length; i++){
        const body = new Notification({
          user: question.watching[i],
          question: question._id,
          answer: newAnswer._id,
          second_user: newAnswer.user,
          notification: "added a new answer"
        })
        console.log(body);
        Notification.addNotification(body, (err, notification) => {
          if(err) throw err;
          else{
            console.log("Notification added");
          }
        });
      }
    }
  });
  newAnswer.save(callback);
  
}

module.exports.getAnswerById = function(id, callback){
  Answer.findById(id, callback).populate('user');
}

module.exports.getAnswer = function(callback){
  Answer.find({}, callback).populate('user');
}

module.exports.deleteAnswer = function(id, callback){
  Answer.findOneAndDelete({_id:id}, callback);
} 

module.exports.updateAnswer = function(id, updateOps, callback){
  Answer.findOneAndUpdate({_id: id}, {$set: updateOps}, {new: true}, callback);
}

module.exports.answer_liked = function(id, liked_by, callback){
  Answer.findOneAndUpdate({_id:id}, { $push: {likedby: liked_by}}, {new: true}, callback);
}

module.exports.answer_disliked = function(id, liked_by, callback){
  Answer.findOneAndUpdate({_id:id}, { $pull: {likedby: liked_by}}, {new: true}, callback);
}

module.exports.answer_reported = function(id, reported_id, callback){
  Answer.findOneAndUpdate({_id:id}, { $push: {reportedby: reported_id}}, {new: true}, callback);
}

module.exports.answer_withheld = function(id, reported_id, callback){
  Answer.findOneAndUpdate({_id:id}, { $pull: {reportedby: reported_id}}, {new: true}, callback);
}

module.exports.upvote = function(id, user, callback){
  Answer.findOneAndUpdate({_id:id}, { $push: {vote: user}}, {new: true}, callback);
}

module.exports.downvote = function(id, user, callback){
  Answer.findOneAndUpdate({_id:id}, { $push: {downvote: user}}, {new: true}, callback);
}

module.exports.pull_upvote = function(id, user, callback){
  Answer.findOneAndUpdate({_id:id}, { $pull: {vote: user}}, {new: true}, callback);
}

module.exports.pull_downvote = function(id, user, callback){
  Answer.findOneAndUpdate({_id:id}, { $pull: {downvote: user}}, {new: true}, callback);
}