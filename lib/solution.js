
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

function Solution(dirPath)
{
	this.dirPath = dirPath;

	this.walkProjects = function(projectFoundFunction)
	{
		var walk_options = {
    		"max_depth": 2
		}

		walk.sync(this.dirPath, walk_options, function (path, stat) {

			if (path.match(/.csproj$/) == null)
			{
				return;
			}
       
			var data = fs.readFileSync(path);
			var parser = new xml2js.Parser();

			parser.parseString(data, function (error, jsObject) {

				var project = new Project(jsObject);
				projectFoundFunction(error, project);
			});
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

module.exports.Solution = Solution;
module.exports.Project = Project;
