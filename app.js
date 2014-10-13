// import the Connect middleware (http://www.senchalabs.org/connect/)
// TODO Upgrade connect, new version is 3.x
var connect = require('connect'),
    // import the shareJs server
    // TODO Upgrade connect, new version is ^0.7
    shareJs = require('share').server,
    logger = require('morgan');

// create a settings object for our shareJs server
shareJsOpts = {
  db: {type: "none" }, // no persistence
  browserChannel: {cors: "http://localhost:63342"} // FIXME Change For Prod
};

// attach a static file server that serves files from our static directory
var server = connect()
  .use(logger())
  .use(connect.static(__dirname + '/public'))
  // Add headers
  .use(function (req, res, next) {

    // Website you wish to allow to connect
    // FIXME This will be different in prod
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
  });

// create a shareJs server and bind to Connect server
shareJs.attach(server, shareJsOpts);

// set our server port and start the server
port = 8000 // FIXME Change For Prod

server.listen(port, function() {
  console.log("ShareJS Server started. Listening on port=" + port);
});


//var express = require('express'),
//	app = express(),
//	server = require('http').createServer(app),
//	io = require('socket.io').listen(server);
//
//app.configure(function() {
////  app.use(express.static(__dirname + '/public'));
//
//  // Add headers
//  app.use(function (req, res, next) {
//
//    // Website you wish to allow to connect
//    // FIXME This will be different in prod
//    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
//
//    // Request methods you wish to allow
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//    // Request headers you wish to allow
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//    // Set to true if you need the website to include cookies in the requests sent
//    // to the API (e.g. in case you use sessions)
//    res.setHeader('Access-Control-Allow-Credentials', false);
//
//    // Pass to next layer of middleware
//    next();
//  });
//
//});
//
//io.sockets.on('connection', function(socket) {
//	socket.on('createNote', function(data) {
//		socket.broadcast.emit('onNoteCreated', data);
//	});
//
//	socket.on('updateNote', function(data) {
//		socket.broadcast.emit('onNoteUpdated', data);
//	});
//
//	socket.on('moveNote', function(data){
//		socket.broadcast.emit('onNoteMoved', data);
//	});
//
//	socket.on('deleteNote', function(data){
//		socket.broadcast.emit('onNoteDeleted', data);
//	});
//});
//
//server.listen(1337);
