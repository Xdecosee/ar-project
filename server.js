// server.js
// where your node app starts
const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


/*mongo.connect('mongodb://Dashre:Xdeco1998@arproject-shard-00-00-cjsdl.mongodb.net:27017,arproject-shard-00-01-cjsdl.mongodb.net:27017,'+
              'arproject-shard-00-02-cjsdl.mongodb.net:27017/test?ssl=true'+
              '&replicaSet=ARPROJECT-shard-0&authSource=admin', function(err, db){
    if(err){
        throw err;
    }

    console.log('MongoDB connected...');
  
     client.on('connection', function(socket){
         let action = db.collection('ARaction');
        
        var sendStatus = function(s){
            socket.emit('status', s);
        }
        
        action.find().sort({_id:-1}).limit(1).toArray(function(err, res){
            if(err){
                throw err;
            }
           console.log("new data!")
            // Emit the messages
            socket.emit('output', res);
        });


     });

});*/

