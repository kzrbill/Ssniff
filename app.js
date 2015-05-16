
var SolutionSniffer = require(__dirname + '/lib/solutionSniffer.js').SolutionSniffer;
var Solution = require(__dirname + '/lib/solution.js').Solution;

var eyes = require('eyes');

function SniffResultsOutput() {
	this.onSniffResultFound = function(smellResult) {
		eyes.inspect(smellResult.viewObject()); 
	}
}

var solution = new Solution(__dirname + "/test/test_solutions/stinked_solution/");
var solutionSniffer = new SolutionSniffer(solution);

solutionSniffer.sniffForSmells(new SniffResultsOutput());
