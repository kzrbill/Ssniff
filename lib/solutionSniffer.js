var Sniffer = require('../lib/sniffer.js').Sniffer;
var NetVersionSmell = require('../lib/smells/netVersionSmell.js').NetVersionSmell;
var AssemblyVersionSmell = require('../lib/smells/assemblyVersionSmell.js').AssemblyVersionSmell;

function SolutionSniffer(solution)
{
	this.sniffer = new Sniffer();

	this.sniffer.addSmell(new NetVersionSmell(solution));
	this.sniffer.addSmell(new AssemblyVersionSmell(solution));

	this.sniffForSmells = function(resultsObserver)
	{
		this.sniffer.sniffForSmells(resultsObserver);
	}
}

module.exports.SolutionSniffer = SolutionSniffer;
