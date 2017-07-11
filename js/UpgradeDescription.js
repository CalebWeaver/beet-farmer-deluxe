let Upgrades = (function() {
	'use strict';
	return {};
}());

let UpgradeUtil = (function() {
    'use strict';

    let self = {};

    self.getDiscoveredUpgrades = getDiscoveredUpgrades;

    return self;

    function getDiscoveredUpgrades() {
        return _.filter(Upgrades,upgrade => upgrade.isDiscovered());
    }
})();