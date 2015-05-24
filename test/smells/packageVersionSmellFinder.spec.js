var PackageVersionSmellFinder = require('../../lib/smells/packageVersionSmellFinder.js').PackageVersionSmellFinder;
var Solution = require('../../lib/solution.js').Solution;
var PackageVersionMismatchResultNotOK = require('../../lib/sniffResults.js').PackageVersionMismatchResultNotOK;
var PackageVersionMismatchResultOK = require('../../lib/sniffResults.js').PackageVersionMismatchResultOK;

describe('PackageVersionSmellFinder', function() {

	describe('when no solution path is provided', function() {

		var error = null;

		try {
			new PackageVersionSmellFinder();
		} catch (_error) {
			error = _error;
		}

		it('throws an error', function() {
			console.log("Error: " + error);

			expect(error).not.toBeNull();
			expect(error).not.toBeUndefined();
		});
	});

	
	var solution = null;
	var smell = null;
	var okResult = null;
	var smellResult = null;

	function SniffResultObserver() {
		this.onOKResultFound = function(_okResult) {
			okResult = _okResult;
		}
		this.onSmellResultFound = function(_smellResult) {
			smellResult = _smellResult;
		}
	}

	
	describe('when we sniff a stinked solution', function() {

		beforeEach(function() {

			solution = new Solution(__dirname + "/../test_solutions/stinked_solution/");
			smell = new PackageVersionSmellFinder(solution);

			okResult = null;
			smellResult = null;

			smell.sniff(new SniffResultObserver());
		});


		it('finds an assembly mismatch in stinked solution', function() {

			expect(smellResult.equals(new PackageVersionMismatchResultNotOK())).toBeTruthy();
		});

	});

	describe('when we sniff a clean solution', function() {

		beforeEach(function() {

			solution = new Solution(__dirname + "/../test_solutions/clean_solution/");
			smell = new PackageVersionSmellFinder(solution);

			okResult = null;
			smellResult = null;

			smell.sniff(new SniffResultObserver());
		});

		it('does not find assembly mismatch in clean solution', function() {

			expect(smellResult).toBeNull();
			expect(okResult.equals(new PackageVersionMismatchResultOK())).toBeTruthy();
		});
	});

	
});
