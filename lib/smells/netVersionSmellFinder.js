var NetVersionMismatchResultOK = require('../sniffResults.js').NetVersionMismatchResultOK;
var NetVersionMismatchResultNotOK = require('../sniffResults.js').NetVersionMismatchResultNotOK;
var ErrorResult = require('../sniffResults.js').ErrorResult;

var walk = require('walkdir'),
    xml2js = require('xml2js'),
    fs = require('fs');

function NetVersionSmellFinder(solution)
{
	if (solution == undefined)
	{
		throw "No solution provided";
	}

	this.solution = solution;

	var prevProject = null;
	var smellFound = false;

	this.sniff = function(sniffObserver)
	{
		this.solution.walkProjects(function(error, project){

			if ((prevProject != null) && (prevProject.netVersion() != project.netVersion())) {

				var message = "Inconsistent .net version found.";

				message += " Project assembly '" + prevProject.assemblyName() + "'";
				message += " .net version is '" + prevProject.netVersion() + "'.";

				message += " Project assembly '" + project.assemblyName() + "'";
				message += " .net version is '" + project.netVersion() + "'.";

				var result = new NetVersionMismatchResultNotOK(message);
				sniffObserver.onSmellResultFound(result);
				smellFound = true;
			}

			prevProject = project;
		});

		if (smellFound != true) {
			var message = "All ok. Consistent .net versions.";
			var result = new NetVersionMismatchResultOK(message);
			sniffObserver.onOKResultFound(result);
		}
	}
}

module.exports.NetVersionSmellFinder = NetVersionSmellFinder;