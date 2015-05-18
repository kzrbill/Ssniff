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

		xit('finds assembly mismatch in stinked solution', function() {
		
		});

		xit('does not find assembly mismatch in clean solution', function() {
		
		}); 
	});
});