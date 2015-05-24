
var PackagesCollection = require('../packages.js').PackagesCollection;
var Packages = require('../packages.js').Packages;
var PackageVersionMismatchResultOK = require('../sniffResults.js').PackageVersionMismatchResultOK;
var PackageVersionMismatchResultNotOK = require('../sniffResults.js').PackageVersionMismatchResultNotOK;

function PackageVersionSmellFinder(solution, differenceStore)
{
	if (solution == undefined)
	{
		throw "No solution provided";
	}

	var _diffStore = !differenceStore ? {} : differenceStore;

	this.sniff = function(sniffObserver)
	{
		var packagesCollection = solution.packagesCollection();

		packagesCollection.walkAllPackages(function(package){
			addIfDifferent(package);
		});

		handleResults(sniffObserver);
	}

	function addIfDifferent(package){

		var diffStore = _diffStore[package.namespace];

		if (_diffStore[package.namespace] == undefined) {
			_diffStore[package.namespace] = new Packages([package]);
			return;
		}
		
		_diffStore[package.namespace].walk(function(storedPackage){

			var onDifferent = function(){
				_diffStore[package.namespace].push(package);
			}

			storedPackage.compare(package, onDifferent);
		});
	}

	function handleResults(sniffObserver){

		var hasDifferences = false;
		walkDifferenceStore(function(packages){

			if (packages.count() > 1)
				hasDifferences = true;
		});

		if (hasDifferences) {
			sniffObserver.onSmellResultFound(new PackageVersionMismatchResultNotOK());
			return;
		}

		sniffObserver.onOKResultFound(new PackageVersionMismatchResultOK());
	}

	function walkDifferenceStore(callbackFunc){
		Object.keys(_diffStore).forEach(function(key) {
			callbackFunc(_diffStore[key]);
		});
	}
}

module.exports.PackageVersionSmellFinder = PackageVersionSmellFinder;
