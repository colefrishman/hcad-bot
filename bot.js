var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var botID = process.env.BOT_ID;

var jukeboxURLs = [
    "https://www.youtube.com/watch?v=UzcpM0xK3Nw",
    "https://www.youtube.com/watch?v=jpdKcdevgro",
    "https://www.youtube.com/watch?v=mnPk5O1LrBk",
    "https://www.youtube.com/watch?v=2Z1bg2EpyrI",
    "https://www.youtube.com/watch?v=jTOdVVAX6To",
    "https://www.youtube.com/watch?v=n2AA_j-gscU",
    "https://www.youtube.com/watch?v=VJ50tQuDlh4",
    "https://www.youtube.com/watch?v=uq48tsyDnQI",
    "https://www.youtube.com/watch?v=b9aDl2GL4Ns",
    "https://www.youtube.com/watch?v=mydlKBr8Ies",
    "https://www.youtube.com/watch?v=HIq-vq80qbU",
    "https://www.youtube.com/watch?v=uk3SCKbluNM",
    "https://www.youtube.com/watch?v=XW-P1xeN9Xw",
    "https://www.youtube.com/watch?v=18yFhhcnYEg"
]

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      hcRegex = /^\!HC$/,
      logoRegex = /^\!logo$/,
      dvdRegex = /^\!dvd$/,
      jukeBoxRegex = /^\!jukebox$/

  if(request.text && hcRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("honors chord");
    this.res.end();
  } 
  else if(request.text && logoRegex.test(request.text)){
    this.res.writeHead(200);
    postMessage("https://i.imgur.com/fIXYAXM.png");
    this.res.end();
  }
  else if (request.text && dvdRegex.test(request.text)){
    this.res.writeHead(200);
    postMessage("https://colefrishman.com/dvd");
    this.res.end();
  }
  else if (request.text && jukeBoxRegex.test(request.text)){
    this.res.writeHead(200);
    postMessage(jukeboxURLs[Math.floor(Math.random() * jukeboxURLs.length)]);
    this.res.end();
  }
  else {
    console.log("don't care");
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
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;