var Table = require('cli-table');

function ViewObjectFactory()
{
	this.valueGroupesBasedViewObject = function(heading, message, valueGroupProvider)
	{
		var table = new Table({
			head: [valueGroupProvider.valueKey, valueGroupProvider.descKey],
			colWidths: [30, 80]
		});

		valueGroupProvider.walkValueGroups(function(valueGroup){
			table.push([valueGroup.value, valueGroup.names]);
		});

		return new TableViewObject(heading, message, table);
	}

	this.differencesBasedViewObject = function(heading, message, differences)
	{
		var table = new Table({
			head: ["Stuff"],
			colWidths: [100]
		});

		table.push(differences);

		return new TableViewObject(heading, message, table);
	}
}

function ViewObject(heading, message)
{
	this.heading = heading;
	this.message = message;
}

function TableViewObject(heading, message, table)
{
	this.heading = heading;
	this.message = message;
	this.table = table;
}

module.exports.ViewObject = ViewObject;
module.exports.ViewObjectFactory = ViewObjectFactory;
