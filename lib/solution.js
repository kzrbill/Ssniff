
var PackagesConfig = require(__dirname + '/packages.js').PackagesConfig;
var Package = require(__dirname + '/packages.js').Package;
var Packages = require(__dirname + '/packages.js').Packages;
var PackagesCollection = require(__dirname + '/packages.js').PackagesCollection; 

var walk = require('walkdir'),
    xml2js = require('xml2js'),
    fs = require('fs'),
    glob = require('glob')
    path = require('path');

function Solution(dirPath)
{
	this.checkSolutionExists = function(validationObserver)
	{
		var solution = this;

		glob(dirPath + "/*.sln", {}, function (er, files) {
			if (files.length < 1) {
				validationObserver.onSolutionNotFound(solution);
			} else {
				validationObserver.onSolutionFound(solution);
			}
		});
	}

	this.walkProjects = function(projectFoundFunction)
	{
		walkXML(dirPath, /.csproj$/, function(error, jsObject, path){

			var project = new Project(jsObject, path);
			projectFoundFunction(error, project);
		});
	}

	this.packagesCollection = function()
	{
		var packagesCollection = new PackagesCollection();

		this.walkProjects(function(error, project){
			
			var packages = project.packages();
			var key = project.assemblyName();

			packagesCollection.push(packages, project.assemblyName());
		});

		return packagesCollection;
	}

	this.copy = function()
	{
		return new Solution(dirPath);
	}
}

function Project(xmlObject, projectPath)
{
	this.xmlObject = xmlObject;
	this.projectPath = projectPath;

	this.dirPath = function()
	{
		return path.dirname(this.projectPath);
	}

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

	this.packages = function()
	{
		var data = fs.readFileSync(this.dirPath() + '/packages.config');
		var parser = new xml2js.Parser();
		var thePackages = [];

		parser.parseString(data, function (error, jsObject) {

			var packagesConfig = new PackagesConfig(jsObject, this);
			thePackages = packagesConfig.packages();
		});

		return thePackages;
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

			callbackFunction(error, jsObject, path);
		});
	});
}

module.exports.Solution = Solution;
module.exports.Project = Project;
