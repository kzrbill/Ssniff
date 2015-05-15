var NetVersionSmell = require('../../lib/smells/netVersionSmell.js').NetVersionSmell;
var Solution = require('../../lib/solution.js').Solution;

describe('Net version smell', function() {
	
	var smell;

	beforeEach(function(){
		 var solution = new Solution(__dirname + "/../test_solutions/stinked_solution.js");
		 smell = new NetVersionSmell(solution);
	});

	describe('when no solution path is provided', function() {

		var error = null;

		try {
			new NetVersionSmell();
		} catch (_error) {
			error = _error;
		}

		it('throws an error', function() {
			expect(error).not.toBeNull();
			expect(error).not.toBeUndefined();
		});

	});

	describe('finds net mismatch', function() {

	});
});