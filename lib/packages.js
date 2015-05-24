
// Boundery file representation
function PackagesConfig(xmlObject, project)
{
	this.packages = function()
	{
		var packages = [];

		this.walkPackages(function(package) {
			packages.push(package);
		});

		return new Packages(packages);
	}

	this.walkPackages = function(packageFoundFunction)
	{
		for (var i = 0; i < xmlObject.packages.package.length; i++) {
			
			var packageData = xmlObject.packages.package[i]['$'];

			packageData.ownerAssemblyName = project.assemblyName;
			packageData.namespace = packageData.id;

			var package = new Package(packageData);

			packageFoundFunction(package);
		};
	}
}

function PackagesCollection()
{
	var _packagesCollection = {};

	this.push = function(packages, projectName)
	{	
		_packagesCollection[projectName] = packages;
	}

	this.walkAllPackages = function(callbackFunc)
	{
		this.walk(function(packages){
			packages.walk(function(package){
				callbackFunc(package);
			});
		});
	}

	this.packagesByNamespace = function(namespace)
	{
		var matchingPackages = [];
		this.walk(function(packages){
			packages.walk(function(package){
				if (package.namespace == namespace)
					matchingPackages.push(package);
			});
		});
		return new Packages(matchingPackages);
	}

	this.walk = function(callbackFunc)
	{
		Object.keys(_packagesCollection).forEach(function(key) {
			var packages = _packagesCollection[key];
			callbackFunc(packages);
		});
	}
}

function Packages(packagesArray)
{
	if(packagesArray.length < 1)
	{
		throw "Packages was empty";
	}

	var _packages = packagesArray;

	this.walk = function(callbackFunction)
	{
		for (var i = 0; i < _packages.length; i++) {
			callbackFunction(_packages[i]);
		};
	}

	this.push = function(package){
		_packages.push(package);
	}

	this.count = function(){
		return _packages.length;
	}
}

function Package(packageData)
{
	this.namespace = packageData.namespace;
	this.version = packageData.version;
	this.targetFramework = packageData.targetFramework;
	this.ownerAssemblyName = packageData.ownerAssemblyName;

	this.compare = function(otherPackage, onDifferentCallback, onEqualCallback, onInvalidComparison)
	{
		if (!onEqualCallback) onEqualCallback = function(){};
		if (!onInvalidComparison) onInvalidComparison = function(){};

		if (this.namespace != otherPackage.namespace) {
			onInvalidComparison();
			return;
		}

		if (this.version == otherPackage.version) {
			onEqualCallback();
		} else {
			onDifferentCallback();
		}
	}
}

module.exports.Package = Package;
module.exports.Packages = Packages;
module.exports.PackagesCollection = PackagesCollection;
module.exports.PackagesConfig = PackagesConfig;
