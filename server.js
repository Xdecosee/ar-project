
// init project
var express = require('express');
var app = express();



app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});



var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


var MongoDB = require('mongodb');

var oplogurl = 'mongodb://Dashre:Xdeco1998@arproject-shard-00-00-cjsdl.mongodb.net:27017,arproject-shard-00-01-cjsdl.mongodb.net:27017,'
+'arproject-shard-00-02-cjsdl.mongodb.net:27017/local?ssl=true&replicaSet=ARPROJECT-shard-0&authSource=admin';

MongoDB.MongoClient.connect(oplogurl, function(err, db) {  
  
  if(err){
    console.log("conn error");
  }
  // Get to oplog collection
  db.collection('oplog.rs', function(err, oplog) {
    // Find the highest timestamp
    oplog.find({}, {
      ts: 1
    }).sort({
      $natural: -1
    }).limit(1).toArray(function(err, data) {
      var lastOplogTime = data[0].ts;
      var queryForTime;
      // If there isn't one found, get one from the local clock
      if (lastOplogTime) { queryForTime = { $gt: lastOplogTime };
      } 
      else {
      var  tstamp = new MongoDB.Timestamp(0, Math.floor(new Date().getTime() / 1000))
        queryForTime = {  $gt: tstamp};
      }
      // Create a cursor for tailing and set it to await data
   var   cursor = oplog.find({  ts: queryForTime   }, { tailable: true, awaitdata: true, oplogReplay: true, numberOfRetries: -1});
      // Wrap that cursor in a Node Stream
   var   stream = cursor.stream();

      // And when data arrives at that stream, print it out
      stream.on('data', function(oplogdoc) {
            console.log("server call : " + oplogdoc.o.attackType);
          

      });
    });
  });
});
