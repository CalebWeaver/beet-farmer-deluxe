let AiPlayers = (function(units, skills, upgrades, events, player, transactions) {
    "use strict";

    let self = {};
    self.activeFarmPlay = activeFarmPlay;
    self.passiveFarmPlay = passiveFarmPlay;

    return self;

    function activeFarmPlay() {
        if (!events[HUNGER_SETS_IN.title].hasOccurred()) {
            events[HUNGER_SETS_IN.title].occurs();
        }
        if (player.currentLevel() >= skills[FARMING].levelCost()) {
            skills[FARMING].levelUp();
        }
        if (transactions.isUpgradePurchasable(upgrades[EAT_BEETS])) {
            upgrades[EAT_BEETS].begin();
        }
        units[SOIL_QUALITY].amount(100);
    }

    function passiveFarmPlay() {
        if (player.currentLevel() >= skills[FARMING].levelCost()) {
            skills[FARMING].levelUp();
        }
    }
})(Units, Skills, Upgrades, Events, Player, TransactionManager);