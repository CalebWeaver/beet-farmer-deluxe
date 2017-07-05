let Generator = (function(units, stats){
	'use strict';
	
	let self = {};

	self.setGeneration = setGeneration;

	return self;

	function setGeneration(name, increment) {
		self[name] = function() {
			let amount = increment() * stats.GENERATE_SPEED;
            units.units[name].add(amount);
            return amount;
        }
	}
}(Units, StatisticTracker));