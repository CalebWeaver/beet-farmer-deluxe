let Units = (function(){
	'use strict';
	return {};
}());

let UnitUtil = (function(units) {
	"use strict";
	let unitUtil = {};
	unitUtil.getDiscoveredUnits = getDiscoveredUnits;

	return unitUtil;

	function getDiscoveredUnits() {
		return _.filter(units, unit => unit.isDiscovered());
	}
})(Units);