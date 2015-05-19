
function Differences(valueKey, descKey)
{
	this.valueKey = valueKey;
	this.descKey = descKey;
	this.valGroups = {};

	this.add = function(object)
	{
		var theValue = object[this.valueKey];
		var theId = object[this.descKey];
		var valGroups = this.valGroups;

		if (!(theValue in valGroups)) {

			valGroups[theValue] = new ValueGroup(theValue);
			valGroups[theValue].add(theId);
		} else {

			valGroups[theValue].add(theId);
		}

		var newDifferences = new Differences(valueKey, descKey);
		newDifferences.valGroups = valGroups;

		return newDifferences;
	}

	this.walkValueGroups = function(callbackFunction)
	{
		var valueGroups = this.valGroups;
		Object.keys(valueGroups).forEach(function(key) {
    		
			var valueGroup = valueGroups[key];
    		callbackFunction(valueGroup);
		});
	}

	this.numberOfDifferences = function()
	{
		var totalKeys = Object.keys(this.valGroups).length;

		if (totalKeys < 1)
			return 0;

		return totalKeys - 1;
	}

	this.valueGroups = function()
	{
		return this.valGroups;
	}

	this.hasValueGroup = function(valueGroup)
	{
		return valueGroup.value in this.valGroups;
	}
}

function ValueGroup(value)
{
	this.names = [];
	this.value = value;

	this.add = function(name)
	{
		this.names.push(name);
	}
}

module.exports.Differences = Differences;
module.exports.ValueGroup = ValueGroup;
