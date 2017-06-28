let Upgrades = (function() {
	'use strict';

	let self = {};

	self.upgrades = {};
	self.getDiscoveredUpgrades = getDiscoveredUpgrades;

	return self;

	function getDiscoveredUpgrades() {
		return _.filter(self.upgrades,upgrade => upgrade.isDiscovered());
	}
}());