var NetVersionMismatchResultOK = require('../sniffResults.js').NetVersionMismatchResultOK;
var NetVersionMismatchResultNotOK = require('../sniffResults.js').NetVersionMismatchResultNotOK;
var ErrorResult = require('../sniffResults.js').ErrorResult;

var walk = require('walkdir'),
    xml2js = require('xml2js'),
    fs = require('fs');

function NetVersionSmell(solution)
{
	if (solution == undefined)
	{
		throw "No solution provided";
	}

	this.solution = solution;

	this.sniff = function(sniffObserver)
	{
		var walk_options = {
	    	"max_depth": 2
		}

	    var previouseVersion = null;
	    var smellFound = false;

		walk.sync(this.solution.dirPath, walk_options, function (path, stat) {

			if (path.match(/.csproj$/) == null)
			{
				return;
			}
       
			var data = fs.readFileSync(path);
			var parser = new xml2js.Parser();

			parser.parseString(data, function (err, jsObject) {

				var targetFrameworkVersion = null;

				targetFrameworkVersion =
					jsObject.
					Project.
					PropertyGroup[0].
					TargetFrameworkVersion[0];

				if ((previouseVersion != null) && (previouseVersion != targetFrameworkVersion)) {

					var message = "Inconsistent .net version found. Ensure each of the projects in the solution have consitent .net versions applied.";
					var result = new NetVersionMismatchResultNotOK(message);
					sniffObserver.onSniffResultFound(result);
					smellFound = true;
				}

				previouseVersion = targetFrameworkVersion;
			});

		});

		if (smellFound != true) {
			var message = "All ok. Consistent .net versions.";
			var result = new NetVersionMismatchResultOK(message);
			sniffObserver.onSniffResultFound(result);
		}

	}
}

module.exports.NetVersionSmell = NetVersionSmell;