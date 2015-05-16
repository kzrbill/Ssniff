var SolutionSniffer = require('../lib/solutionSniffer.js').SolutionSniffer;
var Solution = require('../lib/solution.js').Solution;

describe('Solution', function() {

	var solutionSniffer;
	var smellResult;

	beforeEach(function(){

		var solution = new Solution(__dirname + "/test_solutions/stinked_solution/");
		var solutionSniffer = new SolutionSniffer(solution);

		function SmellObserver() {
			this.onSmellResultFound = function(_smellResult) {
				smellResult = _smellResult;
			}

			this.onOKResultFound = function(_smellResult) {
				smellResult = _smellResult;
			}

			this.onWarningResultFound = function(_smellResult) {
				smellResult = _smellResult;
			}
		}

		solutionSniffer.sniffForSmells(new SmellObserver());
	});

	describe('when sniff for smells', function() {

		it("has a result", function() {
			expect(smellResult).toBeDefined();
		});

		it("the result provides a string for output", function() {
			
			console.log(smellResult.toString());
			expect(smellResult.toString().length).toBeGreaterThan(0);
		});
	});

});
