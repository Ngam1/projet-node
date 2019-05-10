var http = require('http');
var url = require("url");
var querystring = require('querystring');//pour gerer les parametres dans l'url
var EventEmitter = require('events').EventEmitter;//pour cree un evenement
var testMod=require('testModule');

var server = http.createServer(function(req, res) {
	var page = url.parse(req.url).pathname;//recuperer le path
    console.log(page);
    if(page!='/error'){
    	res.writeHead(200, {"Content-Type": "text/plain"});
    	res.write('bonjour');
    	var params = querystring.parse(url.parse(req.url).query/*recuperer les parametres en long string*/)/*parser le string pour avoir un tableau de parametres*/;
    	console.log(params);
		res.write('votre parametre est '+params['param1']);
    		//appeler l'evenement
		jeu.emit('gameover', 'Vous avez perdu !');
    }else{
    	res.writeHead(404, {"Content-Type": "text/plain"});
    	res.write('not found');
    	server.close();
    }
	res.end();
});
//evenements
server.on('close',function () {
	console.log('server killed');
});
//cree un evenement
var jeu = new EventEmitter();

jeu.on('gameover', function(message){
    console.log(message);
    testMod.haha('met le module');
});

// server.on('close',function () {
// 	console.log('bye');
// });
server.listen(8080);