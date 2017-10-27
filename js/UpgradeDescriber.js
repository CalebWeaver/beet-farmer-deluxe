(function(Upgrade, units, skills, upgrades, events, discoverer, stats, save, farmGame,
                                 constitutionTracker, player) {
	'use strict';

    UpgradeUtil.createUpgrade(TILLING, TILLING_TIME,
        function() {
            // return skills[FARMING].level() >= 3;
        }
    );

    UpgradeUtil.createUpgrade(EAT_BEETS, 1000,
        function() {
            return player.notEnoughLevels;
        }
    ).setCost(player.totalLevel())
        .setCostUnit(BEETS)
        .setEffect(() => {
            player.gainXp(player.totalLevel());
            upgrades[EAT_BEETS].setCost(player.totalLevel());
        })
        .toggleCanBuyAgain();

    UpgradeUtil.createUpgrade(PLANT_CORN, PLANT_CORN_TIME,
        function() {
            let kFarmMin = 6;
            return skills[K_FARMING].level() >= kFarmMin;
        }
    );

    for (let typeIndex = 0; typeIndex < TOOL_TYPES.length; typeIndex++) {
        for (let materialIndex = 0; materialIndex < TOOL_MATERIALS.length; materialIndex++) {
            UpgradeUtil.createUpgrade(TOOL_MATERIALS[materialIndex] + ' ' + TOOL_TYPES[typeIndex], 1000,
                () => {
                    let previousTool;
                    if (typeIndex == 0 && materialIndex > 0) {
                        previousTool = UpgradeUtil.getTool(materialIndex - 1, TOOL_TYPES.length - 1);
                    } else if (typeIndex > 0) {
                        previousTool = UpgradeUtil.getTool(materialIndex, typeIndex - 1);
                    }
                    return skills[BEET_MARKET].level() >= (materialIndex * 10) + typeIndex + 1
                        && (!previousTool || previousTool.isObtained());
                })
                .setCost(10 * (materialIndex + 1))
                .setCostUnit(BEETS);
        }
    }

    UpgradeUtil.createUpgrade(IMPROVE_SOIL, 1000,
        () => skills[FARMING].level() >= 3)
        .setCost(10)
        .setCostUnit(BEETS)
        .setEffect(() => Upgrades[IMPROVE_SOIL].setCost(Upgrades[IMPROVE_SOIL].timesBought()));

    UpgradeUtil.createUpgrade(PAINT_STAND, 10000,
        function() {
            return skills[BEET_MARKET].level() >= 5;
        }
    ).setCost(10)
        .setCostUnit(GOLD);

    UpgradeUtil.createUpgrade(POSTERS, 20000,
        function() {
            return skills[BEET_MARKET].level() >= 12;
        }
    ).setCost(30)
        .setCostUnit(GOLD);

    UpgradeUtil.createUpgrade(BEET_CRIERS, 5000,
        function() {
            return skills[BEET_MARKET].level() >= 20;
        }
    ).setCost(80)
        .setCostUnit(GOLD);

    UpgradeUtil.createUpgrade(WHITE_BEET_SEEDS, 0,
        () => {
            return skills[BEET_MARKET].level() >= 5
                && events[VEGETAL_EXPLORATION].hasOccurred()
                && stats.findChance(stats.SECOND_CHANCE / 5)})
        .setCost(10)
        .setCostUnit(GOLD);

    UpgradeUtil.createUpgrade(DIRE_BEET_SEEDS, 0,
        () => {
            return skills[BEET_MARKET].level() >= 10
                && events[VEGETAL_EXPLORATION].hasOccurred()
                && stats.findChance(stats.SECOND_CHANCE / 5)})
        .setCost(10)
        .setCostUnit(GOLD);

    UpgradeUtil.createUpgrade(SENTIENT_BEET_SEEDS, 0,
        () => {
            return skills[BEET_MARKET].level() >= 20
                && events[VEGETAL_EXPLORATION].hasOccurred()
                && stats.findChance(stats.SECOND_CHANCE / 5)})
        .setCost(10)
        .setCostUnit(GOLD);

    UpgradeUtil.createUpgrade(SAZE_RUNIC_BEET_SEEDS, 0,
        () => {
            return skills[BEET_MARKET].level() >= 20
                && events[VEGETAL_EXPLORATION].hasOccurred()
                && stats.findChance((stats.WEEK_CHANCE / 6) * skills[BEET_MARKET].level())})
        .setCost(10)
        .setCostUnit(GOLD);

    UpgradeUtil.createUpgrade(GREENHOUSE, GREENHOUSE_TIME,
        function() {
            return skills[FARMING].level() >= 10
                && skills[K_FARMING].level() >= 5
                && upgrades[WHITE_BEET_SEEDS].isObtained();
        }
    ).setCost(10)
        .setCostUnit(GOLD);

    UpgradeUtil.createUpgrade(AXE, AXE_TIME,
        function() {
            return false;
        }
    );

    UpgradeUtil.createUpgrade(PICK, PICK_TIME,
        function() {
            return false;
        }
    );

    UpgradeUtil.createUpgrade(FISHING_POLE, FISHING_POLE_TIME,
        function() {
            return false;
        }
    );

    loadUpgrades();

	function loadUpgrades() {

		if (save.load) {
			save.load.upgrades.forEach(function(upgrade) {
				upgrades[upgrade.name].isDiscovered(upgrade.isDiscovered);
				upgrades[upgrade.name].isObtained(upgrade.isObtained);
			});
		}
	}
}(Upgrade, Units, Skills, Upgrades, Events, Discoverer, StatisticTracker, SaveManager, BeetFarmMinigame,
    ConstitutionTracker, Player));