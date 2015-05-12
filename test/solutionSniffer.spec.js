var module = require('../lib/solutionSniffer.js');
var SolutionSniffer = module.SolutionSniffer;

describe('Solution sniffer', function() {

	var solutionSniffer;
	var smellResult;

	beforeEach(function(){

		solutionSniffer = new SolutionSniffer();

		function SmellObserver() {
			this.onSniffResultFound = function(_smellResult) {
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
