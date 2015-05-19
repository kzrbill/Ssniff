
var module = require('../lib/differences.js');
var Differences = module.Differences;
var ValueGroup = module.ValueGroup;

describe('Differences', function() {

	var someObjectA = 
	{
		name : "SomeObjectA",
		someSpecialProperty : 1
	}

	var someObjectB =
	{
		name : "SomeObjectB",
		someSpecialProperty : 1
	}

	var someObjectC =
	{
		name : "SomeObjectC",
		someSpecialProperty : 2
	}

	var someObjectD =
	{
		name : "SomeObjectD",
		someSpecialProperty : 3
	}

	var differences = null;
	beforeEach(function() {
		
		var valueKey = "someSpecialProperty";
		var descKey = "name";

		differences = new Differences(valueKey, descKey);
	});
	
	describe('when matching objects supplied', function() {

		it('should have no differences', function() {

			differences.add(someObjectA)
					   .add(someObjectB);

			expect(differences.numberOfDifferences()).toEqual(0);
		});
	});

	describe('when different objects supplied', function() {

		it('should have value groups detailing differences', function() {

			differences.add(someObjectA)
					   .add(someObjectB)
					   .add(someObjectC);

			var valueGroup1 = new ValueGroup(1);
			valueGroup1.add("SomeObjectA");
			valueGroup1.add("SomeObjectB");

			var valueGroup2 = new ValueGroup(2);
			valueGroup2.add("SomeObjectC");

			expect(differences.hasValueGroup(valueGroup1)).toBeTruthy();
			expect(differences.hasValueGroup(valueGroup2)).toBeTruthy();

			expect(differences.numberOfDifferences()).toEqual(1);
		});

	});
});
