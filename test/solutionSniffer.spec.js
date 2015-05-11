var module = require('../lib/solutionSniffer.js');
var SolutionSniffer = module.SolutionSniffer;

describe('Solution sniffer', function() {

	var sniffer;

	beforeEach(function(){
		sniffer = new SolutionSniffer();
	});

	it("can create instances", function() {

		expect(sniffer).toBeDefined();
	});


	it("can run sniffs", function() {

		var ranSniff = false;

		function SomeSmell()
		{
			this.sniff = function(){
				ranSniff = true;
			}
		}

		sniffer.addSmell(new SomeSmell());

		sniffer.sniffForSmells();

    expect(ranSniff).toBe(true);
  });
});