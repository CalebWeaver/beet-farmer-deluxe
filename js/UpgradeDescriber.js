let UpgradeDescriber = (function(Upgrade, units, skills, upgrades, events, discoverer, stats, save, farmGame) {
	'use strict';
	let self = this;

	(function() {

        createUpgrade(TILLING, TILLING_TIME,
            function() {
                return skills[FARMING].level() >= 3;
            }
        );

        createUpgrade(GREENHOUSE, GREENHOUSE_TIME,
            function() {
                return units[GOLD].amount() >= 10;
            }
        ).setCost(10)
            .setCostUnit(GOLD);

        createUpgrade(PLANT_CORN, PLANT_CORN_TIME,
			function() {
				let kFarmMin = 6;
				return skills[K_FARMING].level() >= kFarmMin;
			}
		);

        createUpgrade(FARM_2_1, 1000,
            function() {
                return units[BEETS].amount() >= 8;
            }
        ).setCost(10)
            .setCostUnit(BEETS)
            .setEffect(function() {
                farmGame.GRID_WIDTH = 2;
                farmGame.GRID_HEIGHT = 1;
            });

        createUpgrade(FARM_2_2, 10000,
            function() {
                return units[BEETS].amount() >= 80 && upgrades[FARM_2_1].isObtained();
            }
        ).setCost(100)
            .setCostUnit(BEETS)
            .setEffect(function() {
                farmGame.GRID_WIDTH = 2;
                farmGame.GRID_HEIGHT = 2;
            });

        createUpgrade(FARM_3_2, 10000,
            function() {
                return units[BEETS].amount() >= 800 && upgrades[FARM_2_2].isObtained();
            }
        ).setCost(1000)
            .setCostUnit(BEETS)
            .setEffect(function() {
                farmGame.GRID_WIDTH = 3;
                farmGame.GRID_HEIGHT = 2;
            });

        createUpgrade(FARM_3_3, 10000,
            function() {
                return units[BEETS].amount() >= 3500 && upgrades[FARM_3_2].isObtained();
            }
        ).setCost(4000)
            .setCostUnit(BEETS)
            .setEffect(function() {
                farmGame.GRID_WIDTH = 3;
                farmGame.GRID_HEIGHT = 3;
            });

        createUpgrade(FARM_4_3, 10000,
            function() {
                return units[BEETS].amount() >= 9000 && upgrades[FARM_3_3].isObtained();
            }
        ).setCost(10000)
            .setCostUnit(BEETS)
            .setEffect(function() {
                farmGame.GRID_WIDTH = 4;
                farmGame.GRID_HEIGHT = 3;
            });

        createUpgrade(FARM_4_4, 10000,
            function() {
                return units[BEETS].amount() >= 18000 && upgrades[FARM_4_3].isObtained();
            }
        ).setCost(20000)
            .setCostUnit(BEETS)
            .setEffect(function() {
                farmGame.GRID_WIDTH = 4;
                farmGame.GRID_HEIGHT = 4;
            });

		createUpgrade(IRON_HOE, IRON_HOE_TIME,
			function() {
				return skills[BEET_MARKET].level() >= 3;
			}
		).setCost(10)
            .setCostUnit(GOLD);

		createUpgrade(STEEL_HOE, STEEL_HOE_TIME,
			function() {
                return skills[BEET_MARKET].level() >= 8;
			}
        ).setCost(100)
            .setCostUnit(GOLD);

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

		if (save.load) {
			save.load.upgrades.forEach(function(upgrade) {
				upgrades[upgrade.name].isDiscovered(upgrade.isDiscovered);
				upgrades[upgrade.name].isObtained(upgrade.isObtained);
			});
		}
	}

	function createUpgrade(name, time, discovery) {
		let upgrade = new Upgrade(name, time);
		upgrades[name] = upgrade;
		discoverer[name] = discovery;

		return upgrade;
	}
}(Upgrade, Units, Skills, Upgrades, Events, Discoverer, StatisticTracker, SaveManager, BeetFarmMinigame));