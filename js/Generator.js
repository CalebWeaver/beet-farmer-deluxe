var Generator = (function(){
	'use strict';
	
	var self = {};
	self.unitPerSecond = {}

	self.setGeneration = setGeneration;

	return self;

	function setGeneration(name, increment) {
		self[name] = increment;
	}
}());