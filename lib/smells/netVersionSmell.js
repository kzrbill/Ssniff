var ManaulTaskSniffResult = require('../sniffResults.js').ManaulTaskSniffResult;

function NetVersionSmell()
{
	this.sniff = function(sniffObserver)
	{
		var message = "Ensure each of the projects in the solution have consitent .net versions applied";
		var result = new ManaulTaskSniffResult(message);
		sniffObserver.onSniffResultFound(result);
	}
}

module.exports.NetVersionSmell = NetVersionSmell;