/// Variables - Socket.IO, MongoDB, Express
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoDB = require('mongodb');

///Variables - Connection strings for MongoDB Atlas Databases
var log = process.env.LOG;
var oplogurl = 'mongodb://tester:cR0w_+35t@arproject-shard-00-00-cjsdl.mongodb.net:27017,arproject-shard-00-01-cjsdl.mongodb.net:27017,' +
    'arproject-shard-00-02-cjsdl.mongodb.net:27017/local?ssl=true&replicaSet=ARPROJECT-shard-0&authSource=admin';
var arurl = 'mongodb://tester:cR0w_+35t@arproject-shard-00-00-cjsdl.mongodb.net:27017,arproject-shard-00-01-cjsdl.mongodb.net:27017,' +
    'arproject-shard-00-02-cjsdl.mongodb.net:27017/ARDB?ssl=true&replicaSet=ARPROJECT-shard-0&authSource=admin';

var machines = [];

///Section: load index.html
app.use(express.static('public'));
app.get("/", function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});
http.listen(3000, function() {
    console.log('listening on *:3000');
});

///Section: Retrieve Real-time Data
io.on('connection', function(socket) {

    //User Connected to Socket
    console.log('a user connected');

    //User Disconnect from Socket
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    //Connect to Oplog Collection and listen for insertion of data(actions)
    MongoDB.MongoClient.connect(oplogurl, function(err, db) {

        if (err) {
            console.log("conn error");
        }

        db.collection('oplog.rs', function(err, oplog) {

            oplog.find({}, {
                ts: 1
            }).sort({
                $natural: -1
            }).limit(1).toArray(function(err, data) {
                var lastOplogTime = data[0].ts;
                var queryForTime;

                if (lastOplogTime) {
                    queryForTime = {
                        $gt: lastOplogTime
                    };
                } else {
                    var tstamp = new MongoDB.Timestamp(0, Math.floor(new Date().getTime() / 1000))
                    queryForTime = {
                        $gt: tstamp
                    };
                }
                var cursor = oplog.find({
                    ts: queryForTime
                }, {
                    tailable: true,
                    awaitdata: true,
                    oplogReplay: true,
                    numberOfRetries: -1
                });

                var stream = cursor.stream();
                stream.on('data', function(oplogdoc) {
                    if (oplogdoc.ns == 'ARDB.ARaction') {
                        socket.emit('action', oplogdoc);
                    }

                });
            });
        });

    });

});

///Section: Retrieve a list of machines from database 
MongoDB.MongoClient.connect(arurl, function(err, db) {

    if (err) {
        console.log("conn error");
    }
    db.collection("ARmachine", function(err, machine) {
        machine.find().toArray(function(err, result) {
            if (err) {
                throw err;
            } else {
                for (var i = 0; i < result.length; i++) {
                    machines[i] = result[i];
                }

                app.get("/machines", function(request, response) {
                    response.send(machines);
                });

            }
        });
    });

});