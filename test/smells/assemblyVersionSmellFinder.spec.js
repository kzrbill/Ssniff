var AssemblyVersionSmellFinder = require('../../lib/smells/assemblyVersionSmellFinder.js').AssemblyVersionSmellFinder;
var Solution = require('../../lib/solution.js').Solution;
var NetVersionMismatchResultNotOK = require('../../lib/sniffResults.js').NetVersionMismatchResultNotOK;

describe('AssemblyVersionSmellFinder', function() {

	describe('when no solution path is provided', function() {

		var error = null;

		try {
			new AssemblyVersionSmellFinder();
		} catch (_error) {
			error = _error;
		}

		it('throws an error', function() {
			console.log("Error: " + error);

			expect(error).not.toBeNull();
			expect(error).not.toBeUndefined();
		});
	});

	xdescribe('when we sniff a solution', function() {

		xit('finds net mismatch in stinked solution', function() {
			
			var solution = new Solution(__dirname + "/../test_solutions/stinked_solution/");

			var smell = new NetVersionSmellFinder(solution);
			var result = null;

			function SniffResultObserver() {
				this.onSmellResultFound = function(_result) {
					result = _result;
				}
			}

			smell.sniff(new SniffResultObserver());

			expect(result.equals(new NetVersionMismatchResultNotOK())).toBeTruthy();
		});

		xit('does not find net mismatch in clean solution', function() {
			
			var solution = new Solution(__dirname + "/../test_solutions/clean_solution");
			var smell = new NetVersionSmell(solution);
			var result = null;

			function SniffResultObserver() {
				this.onOKResultFound = function(_result) {
					result = _result;
				}
			}

			smell.sniff(new SniffResultObserver());

			expect(result.equals(new NetVersionMismatchResultNotOK())).toBeTruthy();
		}); 
	});
});