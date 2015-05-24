
var ViewObject = require('../lib/viewObject.js').ViewObject;
var ViewObjectFactory = require('../lib/viewObject.js').ViewObjectFactory;

function ManaulTaskSniffResult(description, message)
{
	this.toString = function()
	{
		return "MANUAL_RESULT";
	}

	this.viewObject = function()
	{
		return new ViewObject(description, message);
	}

	this.equals = function(otherObject)
	{
		return this.toString() == otherObject.toString();
	}
}

function NetVersionMismatchResultNotOK(differences)
{
	this.toString = function()
	{
		return "NET_VERSION_MISMATCH_NOT_OK_RESULT";
	}

	this.viewObject = function()
	{
		var factory = new ViewObjectFactory();
		return factory.valueGroupesBasedViewObject("Net version mismatch check.", "Net version mismatches found.", differences);
	}

	this.equals = function(otherObject)
	{
		return this.toString() == otherObject.toString();
	}
}

function PackageVersionMismatchResultNotOK(differences)
{
	this.toString = function()
	{
		return "PACKAGE_VERSION_MISMATCH_NOT_OK_RESULT";
	}

	this.viewObject = function()
	{
		var factory = new ViewObjectFactory();
		return factory.differencesBasedViewObject("Package version mismatch check.", "Package version mismatches found.", differences);
	}

	this.equals = function(otherObject)
	{
		return this.toString() == otherObject.toString();
	}
}

function PackageVersionMismatchResultOK(message)
{
	this.toString = function()
	{
		return "PACKAGE_VERSION_MISMATCH_OK_RESULT";
	}

	this.viewObject = function()
	{
		return new ViewObject("Package version mismatch check.", message);
	}

	this.equals = function(otherObject)
	{
		return this.toString() == otherObject.toString();
	}
}

function NetVersionMismatchResultOK(message)
{
	this.toString = function()
	{
		return "NET_VERSION_MISMATCH_OK_RESULT";
	}

	this.viewObject = function()
	{
		return new ViewObject("Net version mismatch check.", message);
	}

	this.equals = function(otherObject)
	{
		return this.toString() == otherObject.toString();
	}
}

function ErrorResult(message)
{
	this.toString = function()
	{
		return "ERROR_RESULT";
	}

	this.viewObject = function()
	{
		return new ViewObject("Error result", message);
	}

	this.equals = function(otherObject)
	{
		return this.toString() == otherObject.toString();
	}
}

module.exports.ManaulTaskSniffResult = ManaulTaskSniffResult;
module.exports.NetVersionMismatchResultNotOK = NetVersionMismatchResultNotOK;
module.exports.NetVersionMismatchResultOK = NetVersionMismatchResultOK;
module.exports.PackageVersionMismatchResultOK = PackageVersionMismatchResultOK;
module.exports.PackageVersionMismatchResultNotOK = PackageVersionMismatchResultNotOK;
module.exports.ErrorResult = ErrorResult;