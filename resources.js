const { re } = require("mathjs")

const jukeboxURLs = [
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

const helpCommands = [
	"!help",
	"!HC",
	"!logo",
	"!dvd",
	"!jukebox",
	"!democracy",
	"!F",
	"!request",
	"!solve",
	"!bf",
	"!maxtime",
	"!super",
	"!source",
	"!rr",
	"Don't quote me on this, but"
]

const helpDefs = [
	"Provides help information",
	"Provides the full name of the club",
	"Provides an image of the club logo",
	"Links the HC DVD",
	"Links a random recording from the HC YouTube Channel",
	"Provides HC election information",
	"Provides the Hexadecimal representation of the decimal number 15",
	"don't use this",
	"Provides the solution to the compiled equation",
	"Provides the output of the brainfuck program specified by the arguments",
	"Provides max time",
	"super duper",
	"my source code",
	"rr",
	"Quotes you on this"
]

const helpArgs = [
	"<command (opt)>",
	"(-r)",
	"",
	"",
	"",
	"",
	"",
	"",
	"<equation>",
	"<code> <memsize> <input (opt)>",
	"",
	"<text>",
	"",
	"",
	"<quote>"
]

var helpMap = new Map()
for(var i = 0; i<helpCommands.length; ++i){
	helpMap.set(helpCommands[i], {command: helpCommands[i], def: helpDefs[i], args: helpArgs[i]})
}

const GetAllHelp = () => {
	var ret = ""
	helpMap.forEach(command => {
		ret += command.command
		if(command.args){
			ret += " " + command.args
		}
		ret+= " - " + command.def + "\n"
	})
	return ret
}

const GetHelp = (cmdName) => {
	var command = helpMap.get(cmdName)
	var ret = command.command
	if(command.args){
		ret += " " + command.args
	}
	ret+= " - " + command.def
	return ret
}

const honorWords = [
	"honor",
	"honour",
	"honored",
	"honorable",
	"uf honor",
	"connor"
]

const chordWords = [
	"chord",
	"cord",
	"cored",
	"corde",
	"core",
	"horde"
]

const GetHCRand = () => {
	var ret = honorWords[Math.floor(Math.random()*honorWords.length)]
	let r = Math.random()
	if(r<0.1){
		ret+="\'"
	}
	if(r<0.6){
		ret+="s"
	}
	ret += " " + chordWords[Math.floor(Math.random()*chordWords.length)]
	if(Math.random()<0.5){
		ret+="s"
	}
	return ret
}

console.log(GetHCRand())

module.exports = { jukeboxURLs, GetHelp, GetAllHelp, GetHCRand }