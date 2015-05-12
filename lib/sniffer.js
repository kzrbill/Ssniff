function Sniffer(smells)
{
	this.smells = smells == undefined ? [] : smells;

	this.addSmell = function(smell)
	{
		var smells = this.smells.push(smell);
		return new Sniffer(smells);
	}

	this.sniffForSmells = function(resultsObserver)
	{
		this.smells.forEach(function (smell) {
			smell.sniff(resultsObserver);
		});
	}
}

module.exports.Sniffer = Sniffer;