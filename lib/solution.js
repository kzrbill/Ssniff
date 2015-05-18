
var walk = require('walkdir'),
    xml2js = require('xml2js'),
    fs = require('fs'),
    glob = require('glob');


function Project(xmlObject)
{
	this.xmlObject = xmlObject;

	this.netVersion = function()
	{
		return this.xmlObject.
			Project.
			PropertyGroup[0].
			TargetFrameworkVersion[0];
	}

	this.assemblyName = function()
	{
		return this.xmlObject.
			Project.
			PropertyGroup[0].
			AssemblyName[0];
	}
}

function PackagesConfig(xmlObject)
{
	this.xmlObject = xmlObject;
}

function Solution(dirPath)
{
	this.dirPath = dirPath;

	this.walkProjects = function(projectFoundFunction)
	{
		walkXML(this.dirPath, /.csproj$/, function(error, jsObject){

			var project = new Project(jsObject);
			projectFoundFunction(error, project);
		});
	}

	this.walkPackageConfigs = function(packagesFoundFunction)
	{
		walkXML(this.dirPath, /packages.config$/, function(error, jsObject){

			var packagesConfig = new PackagesConfig(jsObject);
			packagesFoundFunction(error, packagesConfig);
		});
	}

	this.checkSolutionExists = function(validationObserver)
	{
		var solution = this;

		glob(this.dirPath + "/*.sln", {}, function (er, files) {
			if (files.length < 1) {
				validationObserver.onSolutionNotFound(solution);
			} else {
				validationObserver.onSolutionFound(solution);
			}
		});
	}

	this.copy = function()
	{
		return new Solution(this.dirPath);
	}
}

function walkXML(dirPath, pathRegex, callbackFunction)
{
	var walk_options = {
		"max_depth": 2
	}

	walk.sync(dirPath, walk_options, function (path, stat) {

		if (path.match(pathRegex) == null)
		{
			return;
		}
		
		var data = fs.readFileSync(path);
		var parser = new xml2js.Parser();

		parser.parseString(data, function (error, jsObject) {

			callbackFunction(error, jsObject);
		});
	});
}

module.exports.Solution = Solution;
module.exports.Project = Project;
