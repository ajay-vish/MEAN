const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Users = require('./user');
const Answers = require('./answer');
const Questions = require('./question');

const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    default : null
  },
  mobile: {
    type: String,
    default : null
  },
  website: {
    type: String,
    default : null
  },
  gender: {
    type: String,
    default : null
  },
  birthdate: {
    type: Date,
    default : null
  },
  address: {
    line: {
      type: String,
      default : null
    },
    city: {
      type: String,
      default : null
    },
    country: {
      type: String,
      default : null
    },
    pincode: {
      type: String,
      default : null
    },
  },
  job: {
    jobone: {
      title: {
        type: String,
        default : null
      },
      description: {
        type: String,
        default : null
      }
    },
    jobtwo: {
      title: {
        type: String,
        default : null
      },
      description: {
        type: String,
        default : null
      }
    }
  },
  skill : [{
    item_id: {
      type: Number
    },
    item_text: {
      type: String
    },
  }],
  rating: [{
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      default: null
    },
    rate:{
      type: Number,
      default: null
    }
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  reportedby: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  liked_questions:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questions'
  }],
  liked_answers:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answers'
  }],
  admin_action: {
    type: String,
    default: 'Enabled'
  },
  admin_action_comment: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now 
  },
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUser = function(callback){
  User.find({}, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.updateUser = function(id, updateOps, callback){
  User.findOneAndUpdate({_id: id}, {$set: updateOps}, {new: true}, callback);
}

module.exports.deleteUser = function(id, callback){
  User.findOneAndDelete({_id:id}, callback);
} 

module.exports.user_liked = function(id, following_id, callback){
  User.findOneAndUpdate({_id: id}, { $push: {followers: following_id}}, {new: true}, callback);
}

module.exports.user_disliked = function(id, following_id, callback){
  User.findOneAndUpdate({_id: id}, { $pull: {followers: following_id}}, {new: true}, callback);
}

module.exports.user_liked1 = function(id, following_id, callback){
  User.findOneAndUpdate({_id: id}, { $push: {following: following_id}}, {new: true}, callback);
}

module.exports.user_disliked1 = function(id, following_id, callback){
  User.findOneAndUpdate({_id: id}, { $pull: {following: following_id}}, {new: true}, callback);
}

module.exports.question_liked = function(id, following_id, callback){
  User.findOneAndUpdate({_id:id}, { $push: {liked_questions: following_id}}, {new: true}, callback);
}

module.exports.question_disliked = function(id, following_id, callback){
  User.findOneAndUpdate({_id:id}, { $pull: {liked_questions: following_id}}, {new: true}, callback);
}

module.exports.answer_liked = function(id, following_id, callback){
  User.findOneAndUpdate({_id:id}, { $push: {liked_answers: following_id}}, {new: true}, callback);
}

module.exports.answer_disliked = function(id, following_id, callback){
  User.findOneAndUpdate({_id:id}, { $pull: {liked_answers: following_id}}, {new: true}, callback);
}

module.exports.user_reported = function(id, reported_id, callback){
  User.findOneAndUpdate({_id:id}, { $push: {reportedby: reported_id}}, {new: true}, callback);
}

module.exports.user_withheld = function(id, reported_id, callback){
  User.findOneAndUpdate({_id:id}, { $pull: {reportedby: reported_id}}, {new: true}, callback);
}