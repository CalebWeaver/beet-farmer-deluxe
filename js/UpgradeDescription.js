let Upgrades = (function() {
	'use strict';
	return {};
}());

let UpgradeUtil = (function(upgrades) {
    'use strict';

    let self = {};

    self.getDiscoveredUpgrades = getDiscoveredUpgrades;

    return self;

    function getDiscoveredUpgrades() {
        return _.filter(upgrades,upgrade => upgrade.isDiscovered());
    }
})(Upgrades);