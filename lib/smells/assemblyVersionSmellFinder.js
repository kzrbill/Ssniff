var ManaulTaskSniffResult = require('../sniffResults.js').ManaulTaskSniffResult;

function AssemblyVersionSmellFinder(solution)
{
	this.sniff = function(sniffObserver)
	{
		var message = "Ensure each of the projects in the solution have consitent assmeblies referenced.";
		var result = new ManaulTaskSniffResult("Manual assembly version mismatch check.", message);
		sniffObserver.onOKResultFound(result);
	}
}

module.exports.AssemblyVersionSmellFinder = AssemblyVersionSmellFinder;