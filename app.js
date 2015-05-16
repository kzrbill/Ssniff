
var SolutionSniffer = require(__dirname + '/lib/solutionSniffer.js').SolutionSniffer;
var Solution = require(__dirname + '/lib/solution.js').Solution;


var notifier = require('node-notifier');
var eyes = require('eyes');

var errorInspector = eyes.inspector({
    styles: {
        all: 'red'
    }
});

var okInspector = eyes.inspector({
    styles: {
        all: 'green'
    }
});

var warningInspector = eyes.inspector({
    styles: {
        all: 'cyan'
    }
});


function SniffResultsOutput() {
	this.onSmellResultFound = function(smellResult) {

		var viewObject = smellResult.viewObject();

		errorInspector(viewObject);

		notifier.notify({
		  'title': viewObject.description,
		  'message': viewObject.message
		});
		 
	}

	this.onOKResultFound = function(smellResult) {
		okInspector(smellResult.viewObject()); 
	}

	this.onWarningResultFound = function(smellResult) {
		warningInspector(smellResult.viewObject()); 
	}
}

var solutionPath = __dirname + "/test/test_solutions/stinked_solution/"

var args = process.argv.slice(2);

if (args.length >= 1) {
	solutionPath = args[0];
} else {
	console.log("No path supplied so using test solution path: " + solutionPath);
}

function SolutionSnifferStarter()
{
	this.onSolutionFound = function(validationSolution)
	{
		var solution = new Solution(validationSolution.dirPath);
		var solutionSniffer = new SolutionSniffer(solution);
		solutionSniffer.sniffForSmells(new SniffResultsOutput());
	}

	this.onSolutionNotFound = function(validationSolution)
	{
		errorInspector("No solution found at path: " + validationSolution.dirPath);
	}
}

new Solution(solutionPath).checkSolutionExists(new SolutionSnifferStarter());

