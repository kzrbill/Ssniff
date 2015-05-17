var notifier = require('node-notifier');
var eyes = require('eyes');

var errorInspector = eyes.inspector({
    styles: {
        all: 'red'
    }
});

var okInspector = eyes.inspector({
    styles: {
        all: 'green'
    }
});

var warningInspector = eyes.inspector({
    styles: {
        all: 'cyan'
    }
});

// WG ~ Split to class types of outpur - OK, Warning, Error?
function SniffOutput() {

	this.outputError = function(viewObject) {

		errorInspector(viewObject);

		notifier.notify({
		  'title': "SSniff: " + viewObject.description,
		  'message': viewObject.message
		});
	}

	this.outputWarning = function(viewObject) {
		warningInspector(viewObject); 
	}

	this.outputOK = function(viewObject) {
		okInspector(viewObject);
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