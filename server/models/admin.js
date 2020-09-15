const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./user');
const Question = require('./question');
const Answer = require('./answer');
const AdminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.getAdminById = function(id, callback){
  Admin.findById(id, callback);
}

// module.exports.registerAdmin = function(newAdmin, callback){
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(newAdmin.password, salt, (err, hash) => {
//       if(err) throw err;
//       newAdmin.password = hash;
//       console.log(newAdmin)
//       newAdmin.save(callback);
//     });
//   });
// }

module.exports.getAdminByUsername = function(username, callback){
  const query = {username: username}
  Admin.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.updateAdmin = function(id, updateOps, callback){
  Admin.findOneAndUpdate({_id: id}, {$set: updateOps}, {new: true}, callback);
}
