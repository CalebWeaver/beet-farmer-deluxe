(function(Upgrade, units, skills, upgrades, events, discoverer, stats, save, farmGame,
          constitutionTracker, player) {

    UpgradeUtil.createUpgrade(FARM_2_1, 1000,
        function() {
            return units[BEETS].amount() >= 20;
        }
    ).setCost(10)
        .setCostUnit(BEETS)
        .setEffect(function() {
            farmGame.GRID_WIDTH = 2;
            farmGame.GRID_HEIGHT = 1;
        });

    UpgradeUtil.createUpgrade(FARM_2_2, 10000,
        function() {
            return units[BEETS].amount() >= 80 && upgrades[FARM_2_1].isObtained();
        }
    ).setCost(100)
        .setCostUnit(BEETS)
        .setEffect(function() {
            farmGame.GRID_WIDTH = 2;
            farmGame.GRID_HEIGHT = 2;
        });

    UpgradeUtil.createUpgrade(FARM_3_2, 10000,
        function() {
            return units[BEETS].amount() >= 800 && upgrades[FARM_2_2].isObtained();
        }
    ).setCost(1000)
        .setCostUnit(BEETS)
        .setEffect(function() {
            farmGame.GRID_WIDTH = 3;
            farmGame.GRID_HEIGHT = 2;
        });

    UpgradeUtil.createUpgrade(FARM_3_3, 10000,
        function() {
            return units[BEETS].amount() >= 3500 && upgrades[FARM_3_2].isObtained();
        }
    ).setCost(4000)
        .setCostUnit(BEETS)
        .setEffect(function() {
            farmGame.GRID_WIDTH = 3;
            farmGame.GRID_HEIGHT = 3;
        });

    UpgradeUtil.createUpgrade(FARM_4_3, 10000,
        function() {
            return units[BEETS].amount() >= 9000 && upgrades[FARM_3_3].isObtained();
        }
    ).setCost(10000)
        .setCostUnit(BEETS)
        .setEffect(function() {
            farmGame.GRID_WIDTH = 4;
            farmGame.GRID_HEIGHT = 3;
        });

    UpgradeUtil.createUpgrade(FARM_4_4, 10000,
        function() {
            return units[BEETS].amount() >= 18000 && upgrades[FARM_4_3].isObtained();
        }
    ).setCost(20000)
        .setCostUnit(BEETS)
        .setEffect(function() {
            farmGame.GRID_WIDTH = 4;
            farmGame.GRID_HEIGHT = 4;
        });
}(Upgrade, Units, Skills, Upgrades, Events, Discoverer, StatisticTracker, SaveManager, BeetFarmMinigame,
    ConstitutionTracker, Player));