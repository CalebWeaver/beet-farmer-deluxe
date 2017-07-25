let UpgradeDescriber = (function(Upgrade, units, skills, upgrades, events, discoverer, stats, save, farmGame,
                                 constitutionTracker) {
	'use strict';
	let self = this;

	(function() {

        createUpgrade(TILLING, TILLING_TIME,
            function() {
                return skills[FARMING].level() >= 3;
            }
        );

        createUpgrade(EAT_BEETS, 1000,
            function() {
            return true;
                // return ConstitutionTracker.notEnough;
            }
        ).setCost(3)
            .setCostUnit(BEETS)
            .setEffect(() => ConstitutionTracker.constitution += 1)
            .toggleCanBuyAgain();

        createUpgrade(PLANT_CORN, PLANT_CORN_TIME,
            function() {
                let kFarmMin = 6;
                return skills[K_FARMING].level() >= kFarmMin;
            }
        );

        createUpgrade(FARM_2_1, 1000,
            function() {
                return units[BEETS].amount() >= 20;
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

        createUpgrade(IRON_HOE, 1000,
            function() {
                return skills[BEET_MARKET].level() >= 3;
            }
        ).setCost(10)
            .setCostUnit(GOLD);

        createUpgrade(IRON_SPADE, 1000,
            function() {
                return skills[BEET_MARKET].level() >= 8;
            }
        ).setCost(20)
            .setCostUnit(GOLD);

        createUpgrade(IRON_RAKE, 1000,
            function() {
                return skills[BEET_MARKET].level() >= 13;
            }
        ).setCost(40)
            .setCostUnit(GOLD);

        createUpgrade(IRON_PLOW, 1000,
            function() {
                return skills[BEET_MARKET].level() >= 20;
            }
        ).setCost(60)
            .setCostUnit(GOLD);

        createUpgrade(STEEL_HOE, 1000,
            function() {
                return skills[BEET_MARKET].level() >= 25;
            }
        ).setCost(100)
            .setCostUnit(GOLD);

        createUpgrade(STEEL_SPADE, 1000,
            function() {
                return skills[BEET_MARKET].level() >= 29;
            }
        ).setCost(140)
            .setCostUnit(GOLD);

        createUpgrade(STEEL_RAKE, 1000,
            function() {
                return skills[BEET_MARKET].level() >= 35;
            }
        ).setCost(180)
            .setCostUnit(GOLD);

        createUpgrade(STEEL_PLOW, 1000,
            function() {
                return skills[BEET_MARKET].level() >= 42;
            }
        ).setCost(240)
            .setCostUnit(GOLD);

        createUpgrade(BEET_ORE_HOE, 1000,
            function() {
                return skills[BEET_MARKET].level() >= 49
                    && upgrades[BEET_ORE_TOOLS].isObtained();
            }
        ).setCost(300)
            .setCostUnit(GOLD);

        createUpgrade(BEET_ORE_SPADE, 1000,
            function() {
                return skills[BEET_MARKET].level() >= 56
                    && upgrades[BEET_ORE_TOOLS].isObtained();
            }
        ).setCost(380)
            .setCostUnit(GOLD);

        createUpgrade(BEET_ORE_RAKE, 1000,
            function() {
                return skills[BEET_MARKET].level() >= 64
                    && upgrades[BEET_ORE_TOOLS].isObtained();
            }
        ).setCost(450)
            .setCostUnit(GOLD);

        createUpgrade(BEET_ORE_PLOW, 1000,
            function() {
                return skills[BEET_MARKET].level() >= 72
                    && upgrades[BEET_ORE_TOOLS].isObtained();
            }
        ).setCost(550)
            .setCostUnit(GOLD);

        createUpgrade(PAINT_STAND, 10000,
            function() {
                return skills[BEET_MARKET].level() >= 5;
            }
        ).setCost(10)
            .setCostUnit(GOLD);

        createUpgrade(POSTERS, 20000,
            function() {
                return skills[BEET_MARKET].level() >= 12;
            }
        ).setCost(30)
            .setCostUnit(GOLD);

        createUpgrade(BEET_CRIERS, 5000,
            function() {
                return skills[BEET_MARKET].level() >= 20;
            }
        ).setCost(80)
            .setCostUnit(GOLD);

        createUpgrade(WHITE_BEET_SEEDS, 0,
            () => {
                return skills[BEET_MARKET].level() >= 5
                    && events[VEGETAL_EXPLORATION].hasOccurred()
                    && stats.findChance(stats.SECOND_CHANCE / 5)})
            .setCost(10)
            .setCostUnit(GOLD);

        createUpgrade(DIRE_BEET_SEEDS, 0,
            () => {
                return skills[BEET_MARKET].level() >= 10
                    && events[VEGETAL_EXPLORATION].hasOccurred()
                    && stats.findChance(stats.SECOND_CHANCE / 5)})
            .setCost(10)
            .setCostUnit(GOLD);

        createUpgrade(SENTIENT_BEET_SEEDS, 0,
            () => {
                return skills[BEET_MARKET].level() >= 20
                    && events[VEGETAL_EXPLORATION].hasOccurred()
                    && stats.findChance(stats.SECOND_CHANCE / 5)})
            .setCost(10)
            .setCostUnit(GOLD);

        createUpgrade(SAZE_RUNIC_BEET_SEEDS, 0,
            () => {
                return skills[BEET_MARKET].level() >= 20
                    && events[VEGETAL_EXPLORATION].hasOccurred()
                    && stats.findChance((stats.WEEK_CHANCE / 6) * skills[BEET_MARKET].level())})
            .setCost(10)
            .setCostUnit(GOLD);

        createUpgrade(GREENHOUSE, GREENHOUSE_TIME,
            function() {
                return skills[FARMING].level() >= 10
                    && skills[K_FARMING].level() >= 5
                    && upgrades[WHITE_BEET_SEEDS].isObtained();
            }
        ).setCost(10)
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
}(Upgrade, Units, Skills, Upgrades, Events, Discoverer, StatisticTracker, SaveManager, BeetFarmMinigame,
    ConstitutionTracker));