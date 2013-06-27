var express = require('express');
var http = require('http');
var server = express();
var form = require('./form');

server.configure(function() { 
	server.set('port', process.env.PORT || 8000);
	server.use(express.bodyParser());
	server.use(express.methodOverride());
	server.use(express.static('public')); // kani folderin anoune public e extjs-in
	server.enable('trust proxy');
});

server.post('/form/redirection', form.redirection);

http.createServer(server).listen(server.get('port'));