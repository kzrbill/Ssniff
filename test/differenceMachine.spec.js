
function DifferenceMachine(valueKey, idKey)
{
	this.valueKey = valueKey;
	this.idKey = idKey;
	this.diffGroups = [];

	this.add = function(object)
	{
		var theValue = object[this.valueKey];

		if (this.diffGroups[theValue] == undefined)
		{
			this.diffGroups[theValue] = new DifferenceGroup(theValue);
		} else {
			this.diffGroups[theValue].add(this.idKey);
		}
	}

	this.differences = function()
	{
		if (this.diffGroups.length < 2)
			return [];

		return this.diffGroups;
	}
}

function DifferenceGroup(value)
{
	this.names = [];
	this.value = value;

	this.add = function(name)
	{
		this.names.push(name);
	}
}

describe('DifferenceMachine', function() {

	var someObjectA =
	{
		Name : "SomeObjectA",
		SomeSpecialProperty : 1
	}

	var someObjectB =
	{
		Name : "SomeObjectB",
		SomeSpecialProperty : 1
	}

	var someObjectC =
	{
		Name : "SomeObjectC",
		SomeSpecialProperty : 2
	}

	var someObjectD =
	{
		Name : "SomeObjectD",
		SomeSpecialProperty : 3
	}

	var diffMachine = null;
	beforeEach(function() {
		
		var diffKey = "SomeSpecialProperty";
		diffMachine = new DifferenceMachine(diffKey);
	});
	
	describe('when matching objects supplied', function() {

		xit('should have no differences', function() {

			diffMachine.add(someObjectA);
			diffMachine.add(someObjectB);

			console.log("Length: " + diffMachine.differences().length);

			expect(diffMachine.differences().length).toEqual(0);
		});
	});

	describe('when different objects supplied', function() {

		xit('should have difference', function() {

			diffMachine.add(someObjectA);
			diffMachine.add(someObjectB);
			diffMachine.add(someObjectC);

			var diffGroup1 = new DifferenceGroup(1);
			diffGroup1.add("SomeObjectA");
			diffGroup1.add("SomeObjectB");

			var diffGroup2 = new DifferenceGroup(2);
			diffGroup2.add("SomeObjectC");

			var differences =
			[
				diffGroup1,
				diffGroup2
			];

			// SomeObjectA and SomeObjectB have value 1
			// SomeObjectC has value 2
			expect(diffMachine.differences()).toEqual(differences);
		});

		xit('should identify someObjectC as being different', function() {

			diffMachine.add(someObjectA);
			diffMachine.add(someObjectB);
			diffMachine.add(someObjectC);
			diffMachine.add(someObjectD);

			// SomeObjectA and SomeObjectB have value 1
			// SomeObjectC has value 2 
			// someObjectD has value 3
			expect(diffMachine.differences()[0]).toEqual(someObjectC);
		});

	});
});
