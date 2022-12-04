var mathjs = require('mathjs')
var HTTPS = require('https');
var interpreter = require('brainfk-interpreter');
var resources = require('./resources.js')
var mysql = require('mysql');
require('dotenv').config();


var botID = process.env.BOT_ID;
var groupID = process.env.GROUP_ID;


function respond() {
	var request = JSON.parse(this.req.chunks[0]),
		helpCommand = "!help",
		hcCommand = "!HC",
		logoCommand = "!logo",
		dvdCommand = "!dvd",
		jukeBoxCommand = "!jukebox",
		democracyCommand = "!democracy",
		fCommand = "!F",
		requestCommand = "!request",
		solveCommand = "!solve",
		bfCommand = "!bf",
		maxtimeCommand = "!maxtime",
		superCommand = "!super",
		sourceCommand = "!source",
		rrCommand = "!rr",
		reginaldCommand = "!alternatingtuesday",
		punjarCommand = "!punjar",
		quoteCommand = "Don't quote me on this, but",
		jcCommand = "!jc"

	if(groupID != request.group_id || request.sender_type == "bot"){
		this.res.end();
	}
	else if(request.text && request.text.toString().substring(0,helpCommand.length) === helpCommand) {
		try{
			const args = request.text.toString().split(' ');
			var out
			if(args[1]){
				out = resources.GetHelp(args[1])
			}
			else{
				out = resources.GetAllHelp()
			}
			
			this.res.writeHead(200);
			postMessage(out);
			this.res.end();
		}
		catch(err){
			this.res.writeHead(200);
			postMessage("help error");
			console.log(err)
			this.res.end();
		}
	} 
	else if(request.text && request.text.toString().substring(0,hcCommand.length).toLowerCase() === hcCommand.toLowerCase()) {
		try{
			const args = request.text.toString().split(' ');
			var out
			if(args[1] === "-r"){
				out = resources.GetHCRand()
			}
			else{
				out = "honors chord"
			}
			
			this.res.writeHead(200);
			postMessage(out);
			this.res.end();
		}
		catch(err){
			this.res.writeHead(200);
			postMessage("hc error");
			console.log(err)
			this.res.end();
		}
	}
	else if(request.text && request.text.toString() === logoCommand){
		this.res.writeHead(200);
		postMessage("https://i.imgur.com/fIXYAXM.png");
		this.res.end();
	}
	else if (request.text && request.text.toString() === dvdCommand){
		this.res.writeHead(200);
		postMessage("https://colefrishman.com/dvd");
		this.res.end();
	}
	else if (request.text && request.text.toString() === jukeBoxCommand){
		const jukeboxURLs = resources.jukeboxURLs;
		this.res.writeHead(200);
		postMessage(jukeboxURLs[Math.floor(Math.random() * jukeboxURLs.length)]);
		this.res.end();
	}
	else if (request.text && request.text.toString() === democracyCommand){
		this.res.writeHead(200);
		postMessage("After the nominations process only 5 people accepted positions so they will be our eboard for next year!");
		this.res.end();
	}
	else if (request.text && request.text.toString().substring(0,requestCommand.length) === requestCommand){
		try{
			const args = request.text.toString().split(' ');
			var out
			if(args[1] === "-m"){
				out = "!request"
			}
			else{
				out = JSON.stringify(request)
			}
			
			this.res.writeHead(200);
			postMessage(out);
			this.res.end();
		}
		catch(err){
			this.res.writeHead(200);
			postMessage("hc error");
			console.log(err)
			this.res.end();
		}
	}
	else if (request.text && request.text.toString() === fCommand){
		this.res.writeHead(200);
		postMessage("F");
		this.res.end();
	}
	else if (request.text && request.text.toString().substring(0,6) === solveCommand){
		try{
			const eq = request.text.toString().substring(7);

			if(!eq){
				throw 'Bad arguments error'
			}

			var sol = mathjs.evaluate(eq)
			this.res.writeHead(200);
			postMessage("Solution: " + sol);
			this.res.end();
		}
		catch(err){
			this.res.writeHead(200);
			postMessage("solving error");
			this.res.end();
		}
	}
	else if (request.text && request.text.toString().substring(0,3) === bfCommand){
		try{
			const args = request.text.toString().split(' ');

			if(!args[1] || !args[2]){
				throw 'Bad arguments error'
			}

			const source = args[1];
			console.log(source);
			const memsize = parseInt(args[2]);
			const input = args[3];

			if(memsize<1){
				throw 'Bad arguments error'
			}

			var out = interpreter.interpret(source, memsize, input);
			this.res.writeHead(200);
			postMessage("Output: " + out);
			this.res.end();
		}
		catch(err){
			this.res.writeHead(200);
			postMessage("bf error");
			console.log(err)
			this.res.end();
		}
	}
	else if (request.text && request.text.toString().substring(0,6) === superCommand){
		try{
			const arg = request.text.toString().slice(7).toLowerCase();

			if(!arg){
				throw 'Bad arguments error'
			}

			this.res.writeHead(200);
			postMessage("super duper " + arg);
			this.res.end();
		}
		catch(err){
			this.res.writeHead(200);
			postMessage("super error");
			console.log(err)
			this.res.end();
		}
	}
	else if (request.text && request.text.toString() === maxtimeCommand){
		this.res.writeHead(200);
		postMessage("4:00 am to 6:00 am");
		this.res.end();
	}
	else if (request.text && request.text.toString() === sourceCommand){
		this.res.writeHead(200);
		postMessage("this code is awful\n https://github.com/colefrishman/hcad-bot");
		this.res.end();
	}
	else if (request.text && request.text.toString() === rrCommand){
		this.res.writeHead(200);
		postMessage("https://www.youtube.com/watch/dQw4w9WgXcQ");
		this.res.end();
	}
	else if (request.text && request.text.toString() === reginaldCommand){
		this.res.writeHead(200);
		postMessage("Hi, Reginald!");
		this.res.end();
	}
	else if (request.text && (request.text.toString().substring(0,quoteCommand.length).toLowerCase() === quoteCommand.toLowerCase())){
		try{
			const arg = request.text.toString().slice(quoteCommand.length+1);

			if(!arg){
				throw 'Bad arguments error'
			}

			this.res.writeHead(200);
			postMessage(`\"${arg}\" - ${request.name}`);
			this.res.end();
		}
		catch(err){
			this.res.writeHead(200);
			postMessage("quote error");
			console.log(err)
			this.res.end();
		}
	}
	else if(request.text && request.text.toString().substring(0,punjarCommand.length).toLowerCase() === punjarCommand.toLowerCase()) {
		try{
			const args = request.text.toString().split(' ');
			var out
			let me = this;


			var con = mysql.createConnection({
				user: process.env.MY_SQL_USER,
				password: process.env.MY_SQL_PW,
				host: process.env.MY_SQL_HOST,
				port: process.env.MY_SQL_PORT,
				database: process.env.MY_SQL_DB
			});
			
			con.connect(function(err) {
				if (err) throw err;
			})

			if(args[1] == "deposit"){
				con.query("SELECT * FROM punjar", function (err, result) {
					if (err) throw err;
					increaseValue(result[0].value)
				});
			}
			else{
				con.query(`SELECT * FROM punjar`, function (err, result) {
					if (err) throw err;
					returnValue(result[0].value)
				});
			}
			  
			function increaseValue(value) {
				let x = value+1;
				con.query(`UPDATE punjar SET value = ${x} WHERE name = 'Patrick'`, function (err, result) {
					if (err) throw err;
					returnValue(x)
				});
			}
			  
			function returnValue(value) {
				con.end();
				out = `The pun jar now has ${value} monetary units`;
				me.res.writeHead(200);
				postMessage(out);
				me.res.end();
			}
		}
		catch(err){
			this.res.writeHead(200);
			postMessage("hc error");
			console.log(err)
			this.res.end();
		}
	}
	else if (request.text && request.text.toString() === jcCommand){
		this.res.writeHead(200);
		postMessage("jesus chords");
		this.res.end();
	}
	else {
		this.res.writeHead(200);
		this.res.end();
	}
}

function postMessage(message) {

	var botResponse, options, body, botReq;
	botResponse = message;

	options = {
		hostname: 'api.groupme.com',
		path: '/v3/bots/post',
		method: 'POST'
	};

	body = {
		"bot_id" : botID,
		"text" : botResponse
	};

	console.log('sending ' + botResponse + ' to ' + botID);

	botReq = HTTPS.request(options, function(res) {
			if(res.statusCode == 202) {
				//neat
			} else {
				console.log('rejecting bad status code ' + res.statusCode);
			}
	});

	botReq.on('error', function(err) {
		console.log('error posting message '	+ JSON.stringify(err));
	});
	botReq.on('timeout', function(err) {
		console.log('timeout posting message '	+ JSON.stringify(err));
	});
	botReq.end(JSON.stringify(body));
}


exports.respond = respond;