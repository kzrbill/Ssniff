var ManaulTaskSniffResult = require('../sniffResults.js').ManaulTaskSniffResult;

function UnsignedAssemblySmell(solution)
{
	this.sniff = function(sniffObserver)
	{
		var message = "Ensure all of the assemblies are signed so they can be references drom the GAC.";
		var result = new ManaulTaskSniffResult("Manual unsigned assembly check.", message);
		sniffObserver.onWarningResultFound(result);
	}
}

module.exports.UnsignedAssemblySmell = UnsignedAssemblySmell;