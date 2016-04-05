var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false })); // to support URL-encoded bodies
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render("index");
})
// post route for adding a user
app.post('/result', function(req, res) {
	submitted_info = {
		name: req.body.name,
		dojo_location: req.body.dojo_location,
		favorite_language: req.body.favorite_language,
		comment: req.body.comment
	};
	res.render("result",{user_data: submitted_info});
})
// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
	// If you don't know where this code is supposed to go reread the above info 
	socket.on("button_clicked", function (data){
	    console.log('Someone clicked a button!  Reason: ' + data.reason);
	    socket.emit('server_response', {response: "sockets are the best!"});
	});
})