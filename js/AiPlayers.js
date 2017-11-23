let AiPlayers = (function(units, skills, upgrades, events, player, transactions, generator, stats, minigame) {
    "use strict";

    let self = {};
    self.activeFarmPlay = activeFarmPlay;
    self.passiveFarmPlay = passiveFarmPlay;

    let farmed = false;

    return self;

    function activeFarmPlay() {
        if (!upgrades[EAT_BEETS].isAvailable()) {
            player.notEnoughLevels = true;
        }
        if (player.currentLevel() >= skills[FARMING].levelCost()) {
            skills[FARMING].levelUp();
        }
        if (transactions.isUpgradePurchasable(upgrades[EAT_BEETS]) && !upgrades[EAT_BEETS].inProgress()) {
            transactions.buyUpgrade(upgrades[EAT_BEETS]);
        }
        if (Math.floor(stats.totalTimePlayed()) % 7 == 0 && !farmed) {
            minigame.perfectReward();
            farmed = true;
        } else if (Math.floor(stats.totalTimePlayed()) % 7 > 0 && farmed) {
            farmed = false;
        }
        units[SOIL_QUALITY].amount(100);
    }

    function passiveFarmPlay() {
        if (player.currentLevel() >= skills[FARMING].levelCost()) {
            skills[FARMING].levelUp();
        }
    }
})(Units, Skills, Upgrades, Events, Player, TransactionManager, Generator, StatisticTracker, BeetFarmMinigame);