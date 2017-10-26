// server.js
// where your node app starts

//const client = require('socket.io').listen(4000).sockets;

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
const mongo = require('mongodb').MongoClient;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log("user connected....");
  socket.on('disconnect', function () {
        console.log('user disconnected');
    });
  socket.on('action', function (sphere) {
    io.emit('action', sphere);
  });
  
  mongo.connect('mongodb://Dashre:Xdeco1998@arproject-shard-00-00-cjsdl.mongodb.net:27017,arproject-shard-00-01-cjsdl.mongodb.net:27017,'+
              'arproject-shard-00-02-cjsdl.mongodb.net:27017/ARDB?ssl=true'+
              '&replicaSet=ARPROJECT-shard-0&authSource=admin', function(err, db){
  
    var collection = db.collection('ARaction')
    var stream = collection.find().sort({ _id : -1 }).limit(1).stream();
     stream.on('data', function (doc){ socket.emit('action', doc.attackType);});
 
  });

});
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


server.listen(3000, function(){
  console.log('server listening...');
});

