var Sniffer = require('../lib/sniffer.js').Sniffer;
var NetVersionSmellFinder = require('../lib/smells/netVersionSmellFinder.js').NetVersionSmellFinder;
var PackageVersionSmellFinder = require('../lib/smells/packageVersionSmellFinder.js').PackageVersionSmellFinder;
var UnsignedAssemblySmellFinder = require('../lib/smells/unsignedAssemblySmellFinder.js').UnsignedAssemblySmellFinder;

function SolutionSniffer(solution)
{
	this.sniffer = new Sniffer();

	this.sniffer.addSmell(new NetVersionSmellFinder(solution));
	this.sniffer.addSmell(new PackageVersionSmellFinder(solution));
	this.sniffer.addSmell(new UnsignedAssemblySmellFinder(solution));

	this.sniffForSmells = function(resultsObserver)
	{
		this.sniffer.sniffForSmells(resultsObserver);
	}
}

module.exports.SolutionSniffer = SolutionSniffer;
