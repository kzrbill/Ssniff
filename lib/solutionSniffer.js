var Sniffer = require('../lib/sniffer.js').Sniffer;
var NetVersionSmell = require('../lib/smells/netVersionSmell.js').NetVersionSmell;
var AssemblyVersionSmell = require('../lib/smells/assemblyVersionSmell.js').AssemblyVersionSmell;

function SolutionSniffer()
{
	this.sniffer = new Sniffer();

	this.sniffer.addSmell(new NetVersionSmell());
	this.sniffer.addSmell(new AssemblyVersionSmell());

	this.sniffForSmells = function(resultsObserver)
	{
		this.sniffer.sniffForSmells(resultsObserver);
	}
}

module.exports.SolutionSniffer = SolutionSniffer;
