var ManaulTaskSniffResult = require('../sniffResults.js').ManaulTaskSniffResult;

function AssemblyVersionSmell()
{
	this.sniff = function(sniffObserver)
	{
		var message = "Ensure each of the projects in the solution have consitent assmeblies referenced.";
		var result = new ManaulTaskSniffResult(message);
		sniffObserver.onSniffResultFound(result);
	}
}

module.exports.AssemblyVersionSmell = AssemblyVersionSmell;