
var SolutionSniffer = require(__dirname + '/lib/solutionSniffer.js').SolutionSniffer;
var Solution = require(__dirname + '/lib/solution.js').Solution;

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
		errorInspector(smellResult.viewObject()); 
	}

	this.onOKResultFound = function(smellResult) {
		okInspector(smellResult.viewObject()); 
	}

	this.onWarningResultFound = function(smellResult) {
		warningInspector(smellResult.viewObject()); 
	}
}

var solution = new Solution(__dirname + "/test/test_solutions/stinked_solution/");
var solutionSniffer = new SolutionSniffer(solution);

solutionSniffer.sniffForSmells(new SniffResultsOutput());
