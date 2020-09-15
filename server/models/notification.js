const mongoose = require('mongoose');
const User = require('./user');
const Answer = require('./answer');
const Question = require('./question');


const NotificationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'User'
  },
  second_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notification: {
    type: String,
    required: true
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer' 
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question' 
  },
  isRead: {
      type: Boolean,
      default: false
  },
  created_at: {
    type: Date,
    default: Date.now 
  }
});

const Notification = module.exports = mongoose.model('Notification', NotificationSchema);

module.exports.addNotification = function(newNofication, callback){
    newNofication.save(callback);
}

module.exports.getNotificationByUId = function(u_id, callback){
    Notification.find({user: u_id}, callback).populate('user').populate('question').populate('second_user').populate('answer');
}

module.exports.read = function(id, callback){
    Notification.findOneAndUpdate({_id:id}, {isRead: true}, callback);
}

