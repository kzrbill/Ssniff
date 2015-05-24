var notifier = require('node-notifier');
var colors = require('colors');
var Table = require('cli-table');

var table = new Table({
    head: ['Value', 'Assemblies']
  , colWidths: [30, 80]
});

function SniffOutput() {

	this.outputDialogue = function(dialogue) {
		console.log((dialogue.toUpperCase()).bold);
		console.log("\n");
	}

	this.outputError = function(viewObject) {

		notifier.notify({
		  'title': "SSniff: " + viewObject.heading,
		  'message': viewObject.message
		});

		console.log(("FAIL: " + viewObject.heading.toUpperCase()).bold.red);
		console.log(viewObject.message);

		if (viewObject.table != undefined)
			console.log(viewObject.table.toString());

		console.log("\n");
	}

	this.outputWarning = function(viewObject) {

		console.log(("WARN: " + viewObject.heading.toUpperCase()).bold.yellow);
		console.log(viewObject.message);

		if (viewObject.table != undefined)
			console.log(viewObject.table.toString());

		console.log("\n");
	}

	this.outputOK = function(viewObject) {
		
		console.log(("PASS: " + viewObject.heading.toUpperCase()).bold.green);
		console.log(viewObject.message);

		if (viewObject.table != undefined)
			console.log(viewObject.table.toString());

		console.log("\n");
	}

	// Sniff observer methods
	this.onSmellResultFound = function(smellResult) {

		var viewObject = smellResult.viewObject();
		this.outputError(viewObject);
	}

	this.onOKResultFound = function(smellResult) {

		var viewObject = smellResult.viewObject();
		this.outputOK(viewObject);
	}

	this.onWarningResultFound = function(smellResult) {

		var viewObject = smellResult.viewObject();
		this.outputWarning(viewObject);
	}
}

module.exports.SniffOutput = SniffOutput;