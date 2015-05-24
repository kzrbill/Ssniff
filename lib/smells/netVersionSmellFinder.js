 
var Differences = require('../differences.js').Differences;
var ValueGroup = require('../differences.js').ValueGroup;

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

	this.sniff = function(sniffObserver)
	{
		var hasProjects = false;

		var differences = new Differences("netVersion", "assemblyName");

		solution.walkProjects(function(error, project){

			var projectInfo = 
			{
				netVersion : project.netVersion(),
				assemblyName : project.assemblyName()	
			}

			differences.add(projectInfo);
		});

		if (differences.numberOfDifferences() > 0) {
			
			var result = new NetVersionMismatchResultNotOK(differences);
			sniffObserver.onSmellResultFound(result);

		} else {

			var message = "All OK. Consistent .net version '" + differences.firstValue() + "' in all projects ";
			var result = new NetVersionMismatchResultOK(message);
			sniffObserver.onOKResultFound(result);
		}
	}
}

module.exports.NetVersionSmellFinder = NetVersionSmellFinder;