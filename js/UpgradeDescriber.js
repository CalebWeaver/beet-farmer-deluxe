var UpgradeDescriber = (function(Upgrade, unitsM, skillsM, upgradesM, eventsM, discoverer, stats, save) {
	'use strict';
	var self = this;

	(function() {

		var units = unitsM.units;
		var skills = skillsM.skills;
		var upgrades = upgradesM.upgrades;
		var events = eventsM.events;

        createUpgrade(TILLING, TILLING_TIME,
            function() {
                var beetsMin = 100;
                return units[BEETS].amount() >= beetsMin;
            }
        ).setCostDesc('100 Gold');

        createUpgrade(GREENHOUSE, GREENHOUSE_TIME,
            function() {
                var beetsMin = 10;
                return units[BEETS].amount() >= beetsMin;
			}
        ).setCost(10)
			.setCostUnit(GOLD);

		createUpgrade(PLANT_CORN, PLANT_CORN_TIME,
			function() {
				var kFarmMin = 6;
				return skills[K_FARMING].level() >= kFarmMin;
			}
		);

		createUpgrade(IRON_HOE, IRON_HOE_TIME,
			function() {
				return skills[CRAFTING].isAvailable();
			}
		);

		createUpgrade(STEEL_HOE, STEEL_HOE_TIME,
			function() {
				return upgrades[IRON_HOE].isObtained();
			}
		);

		createUpgrade(AXE, AXE_TIME,
			function() {
				return false;
			}
		);

		createUpgrade(PICK, PICK_TIME,
			function() {
				return false;
			}
		);

		createUpgrade(FISHING_POLE, FISHING_POLE_TIME,
			function() {
				return false;
			}
		);

		loadUpgrades();
	})();

	return self;

	function loadUpgrades() {

		var upgrades = upgradesM.upgrades;

		if (save.load) {
			save.load.upgrades.forEach(function(upgrade) {
				upgrades[upgrade.name].isDiscovered(upgrade.isDiscovered);
				upgrades[upgrade.name].isObtained(upgrade.isObtained);
			});
		}
	}

	function createUpgrade(name, time, discovery) {
		var upgrade = new Upgrade(name, time);
		upgradesM.upgrades[name] = upgrade;
		discoverer[name] = discovery;

		return upgrade;
	}
}(Upgrade, Units, Skills, Upgrades, Events, Discoverer, StatisticTracker, SaveManager));