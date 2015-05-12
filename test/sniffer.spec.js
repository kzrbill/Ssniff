var module = require('../lib/sniffer.js');
var Sniffer = module.Sniffer;

describe('Sniffer', function() {

	var sniffer;

	beforeEach(function(){
		sniffer = new Sniffer();
	});

	it("can create instance", function() {
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