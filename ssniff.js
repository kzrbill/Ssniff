
var SolutionSniffer = require(__dirname + '/lib/solutionSniffer.js').SolutionSniffer;
var Solution = require(__dirname + '/lib/solution.js').Solution;
var SniffOutput = require(__dirname + '/lib/sniffOutput.js').SniffOutput;
var ViewObject = require(__dirname + '/lib/viewObject.js').ViewObject;

var solutionPath = __dirname + "/test/test_solutions/stinked_solution/";
var args = process.argv.slice(2);

if (args.length >= 1) {
	solutionPath = args[0];
} else {
	console.log("No path supplied so using test solution path: " + solutionPath);
}

var ouput = new SniffOutput();

function SniffRunner()
{
	this.onSolutionFound = function(solution)
	{
		solution = solution.copy(); // ~ use copy to prevent dependency recurson.
		var solutionSniffer = new SolutionSniffer(solution);
		solutionSniffer.sniffForSmells(ouput);
	}

	this.onSolutionNotFound = function(solution)
	{
		var viewObject = new ViewObject("Solution not found", "No solution found at path: " + solution.dirPath);
		ouput.outputError(viewObject);
	}
}

new Solution(solutionPath).checkSolutionExists(new SniffRunner());
