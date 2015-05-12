
var SolutionSniffer = require(__dirname + '/lib/solutionSniffer.js').SolutionSniffer;
var eyes = require('eyes');

function SniffResultsOutput() {
	this.onSniffResultFound = function(smellResult) {
		eyes.inspect(smellResult); 
	}
}

var solutionSniffer = new SolutionSniffer();
solutionSniffer.sniffForSmells(new SniffResultsOutput());
