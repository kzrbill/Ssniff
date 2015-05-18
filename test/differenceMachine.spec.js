
function DifferenceMachine(diffKey)
{
	this.diffKey = diffKey;

	this.add = function(object)
	{
		return this;
	}

	this.differences = function()
	{
		return [];
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
		Name : "SomeObjectB",
		SomeSpecialProperty : 2
	}

	var diffMachine = null;
	beforeEach(function() {
		
		var diffKey = "SomeSpecialProperty";
		diffMachine = new DifferenceMachine(diffKey);
	});
	
	describe('when matching objects supplied', function() {

		it('should have no differences', function() {

			diffMachine = diffMachine.add(someObjectA)
									 .add(someObjectB);

			expect(diffMachine.differences().length).toEqual(0);
		});
	});

	describe('when different objects supplied', function() {

		it('should have difference', function() {

			diffMachine = diffMachine.add(someObjectA)
									 .add(someObjectB)
									 .add(someObjectC);

			expect(diffMachine.differences().length).toEqual(1);
		});
	});
});
