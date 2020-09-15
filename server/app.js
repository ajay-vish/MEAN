const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config/database');
const socket = require('socket.io');

const app = express();
const port = 3000;

//MongoDB connection
mongoose.connect(config.database,{useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

const users = require('./routes/users');
const questions = require('./routes/questions');
const answers = require('./routes/answers');
const admin = require('./routes/admins');
const notification = require('./routes/notifications');

app.use(morgan('dev'));

app.use('/users', users);
app.use('/questions', questions);
app.use('/answers', answers);
app.use('/admin', admin);
app.use('/notifications', notification);

//For chat application
app.get('/chatroom/:room', (req, res, next) => {
  let room = req.params.room;
  chatRooms.find({name: room}).toArray((err, chatroom) => {
      if(err) {
          console.log(err);
          return false;
      }
      res.json(chatroom[0].messages);
  });
});

app.get('/chatroom/user/:id', (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  chatRooms.find({user: id}).toArray((err, chatroom) => {
      if(err) {
          console.log(err);
          return false;
      }
      res.json(chatroom);
  });
});

//Done!

app.use((req, res,next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status
    }
  })
});

const server = app.listen(port, () => {
  console.log("Server started on port " + port + "...");
});


// chat application

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let count;
let chatRooms;
let messagesArray = [];

MongoClient.connect('mongodb://localhost:27017/vap', (err, Database) => {
    if(err) {
        console.log(err);
        return false;
    }
    console.log("Connected to MongoDB");
    const db = Database.db("vap");
    chatRooms = db.collection("chatRooms");
    
    const io = socket.listen(server);

    io.sockets.on('connection', (socket) => {
        socket.on('join', (data) => {
            socket.join(data.room);
            chatRooms.find({}).toArray((err, rooms) => {
                if(err){
                    console.log(err);
                    return false;
                }
                count = 0;
                rooms.forEach((room) => {
                    if(room.name == data.room){
                        count++;
                    }
                });
                if(count == 0) {
                    var currentTime = new Date();
                    chatRooms.insertOne({ 
                      name: data.room, 
                      user: data.user, 
                      messages: [{
                        user: null, 
                        message: null, 
                        created_at:null
                      }], 
                      created_at: currentTime 
                    }); 
                }
            });
        });
        socket.on('message', (data) => {
            io.in(data.room).emit('new message', {user: data.user, message: data.message, created_at: data.created_at});
            chatRooms.update({name: data.room}, { $push: { messages: { user: data.user, message: data.message, created_at: data.created_at} } }, (err, res) => {
                if(err) {
                    console.log(err);
                    return false;
                }
                console.log("Document updated");
            });
        });
        socket.on('typing', (data) => {
            socket.broadcast.in(data.room).emit('typing', {data: data, isTyping: true});
        });
    });
});
// chat application close