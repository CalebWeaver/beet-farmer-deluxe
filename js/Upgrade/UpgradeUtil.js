let UpgradeUtil = (function(upgrades, discoverer) {
    'use strict';

    let self = {};

    self.getDiscoveredUpgrades = getDiscoveredUpgrades;
    self.getTool = getTool;
    self.getToolByString = getToolByString;
    self.createUpgrade = createUpgrade;

    return self;

    function getDiscoveredUpgrades() {
        return _.filter(upgrades,upgrade => upgrade.isDiscovered());
    }

    function getTool(material, type) {
        return upgrades[TOOL_MATERIALS[material] + ' ' + TOOL_TYPES[type]];
    }

    function getToolByString(material, type) {
        return upgrades[material + ' ' + type];
    }

    function createUpgrade(name, time, discovery) {
        let upgrade = new Upgrade(name, time);
        upgrades[name] = upgrade;
        discoverer[name] = discovery;

        return upgrade;
    }
})(Upgrades, Discoverer);