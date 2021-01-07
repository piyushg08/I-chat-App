const path = require('path');
const http = require('http');
const express = require('express');
var Sentiment = require('sentiment');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');
var natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');
var Analyzer = natural.SentimentAnalyzer;
var stemmer = natural.PorterStemmer;
var analyzer = new Analyzer("English", stemmer, "afinn");
var Filter = require('bad-words'),
    filter = new Filter();


const app = express();
const server = http.createServer(app);
const io = socketio(server);
var sentiment = new Sentiment();

const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Ichat';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to Intelligent Chat Application...'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
   
    
    const lexedReview = aposToLexForm(msg);

  // casing
  const casedReview = lexedReview.toLowerCase();

  // removing
  const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');

  // tokenization
  const { WordTokenizer } = natural;
  const tokenizer = new WordTokenizer();
  const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);

  // spell correction
  tokenizedReview.forEach((word, index) => {
    tokenizedReview[index] = spellCorrector.correct(word);
  })
  
  // remove stopwords
  const filteredReview = SW.removeStopwords(tokenizedReview);

    re=analyzer.getSentiment(filteredReview);
    ms=filter.clean(msg)
    io.to(user.room).emit('message', formatMessage(user.username,`${ms}`));
    io.to(user.room).emit('show-alert',re,user.username);
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {

    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
