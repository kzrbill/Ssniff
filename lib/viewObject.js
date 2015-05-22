var Table = require('cli-table');

function ViewObjectFactory()
{
	this.differenceBasedViewObject = function(heading, message, differences)
	{
		var table = new Table({
			head: [differences.valueKey, differences.descKey],
			colWidths: [30, 80]
		});

		differences.walkValueGroups(function(valueGroup){
			table.push([valueGroup.value, valueGroup.names]);
		});

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
