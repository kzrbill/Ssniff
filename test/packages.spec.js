
var module = require('../lib/packages.js');
var Package = module.Package;
var Packages = module.Packages;
var PackagesCollection = module.PackagesCollection;

describe('Package', function() {

	var callbacks =
	{
		'onEqualCallback' : function(){},
		'onDifferentCallback' : function(){},
		'onInvalidComparison' : function(){}
	};

	var package = new Package({"namespace" : "Some.Package", "version" : "1.0" });

	describe('when it is compared', function() {
		
		it('should give invalid comparison', function() {;

			spyOn(callbacks, 'onInvalidComparison');

			var otherPackage = new Package({"namespace" : "Some.Other.Package"});
			package.compare(otherPackage, callbacks.onDifferentCallback, callbacks.onEqualCallback, callbacks.onInvalidComparison);

			expect(callbacks.onInvalidComparison).toHaveBeenCalled();
		});

		it('should give equality callback', function() {

			spyOn(callbacks, 'onEqualCallback');

			var otherPackage = new Package({"namespace" : "Some.Package", "version" : "1.0" });
			package.compare(otherPackage, callbacks.onDifferentCallback, callbacks.onEqualCallback, callbacks.onInvalidComparison);

			expect(callbacks.onEqualCallback).toHaveBeenCalled();
		});


		it('should give different callback', function() {

			spyOn(callbacks, 'onDifferentCallback');

			var otherPackage = new Package({"namespace" : "Some.Package", "version" : "1.2" });

			package.compare(otherPackage, callbacks.onDifferentCallback, callbacks.onEqualCallback, callbacks.onInvalidComparison);

			expect(callbacks.onDifferentCallback).toHaveBeenCalled();
		});

	});
});
