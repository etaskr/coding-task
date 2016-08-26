var http = require('http');
var fs = require('fs');
var requestify = require('requestify');

var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket, userId) {

    socket.emit('connected', 'connected');

    socket.on('userId', function(userId) {
        socket.userId = userId;
    });

    socket.on('position', function (position) {
        console.log(socket.userId + 'position:' + JSON.stringify(position));
        requestify.get('https://api.forecast.io/forecast/935a7ce18d8af995ee18a05ac1183555/'+position.lat+','+position.lng).then(function(response) {
          var data = response.getBody();
          socket.emit('forecast', data);
        });
    });
});

server.listen(8080);
