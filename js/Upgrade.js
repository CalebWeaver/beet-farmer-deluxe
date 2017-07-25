let Upgrade = (function() {
    'use strict';

    return Upgrade;

    function Upgrade(name, time) {
        let upgrade = this;
        upgrade.name = name;
        upgrade.begin = begin;
        upgrade.time = time;
        upgrade.inProgress = ko.observable(false);
        upgrade.isDiscovered = ko.observable(false);
        upgrade.isObtained = ko.observable(false);
        upgrade.effect = function(){};
        upgrade.costDesc = '';
        upgrade.cost = '';
        upgrade.costUnit = '';
        upgrade.isAvailable = ko.computed(isAvailable);
        upgrade.canBuyAgain = false;
        upgrade.removeProgress = removeProgress;
        upgrade.setName = setName;
        upgrade.setTime = setTime;
        upgrade.setEffect = setEffect;
        upgrade.setCostDesc = setCostDesc;
        upgrade.setCost = setCost;
        upgrade.setCostUnit = setCostUnit;
        upgrade.toggleCanBuyAgain = toggleCanBuyAgain;

        function begin() {
            upgrade.inProgress(true);
            return new Promise((resolve, reject) => {
                setTimeout(function() {
                    if (!upgrade.canBuyAgain) {
                        upgrade.isObtained(true);
                    }
                    upgrade.inProgress(false);
                    upgrade.effect();
                    resolve();
                }, upgrade.time);
            });
        }

        function setName(value) {
            upgrade.name = value;
            return upgrade;
        }

        function setTime(value) {
            upgrade.time = value;
            return upgrade;
        }

        function setEffect(effect) {
            upgrade.effect = effect;
            return upgrade;
        }

        function setCostDesc(value) {
            upgrade.costDesc = value;
            return upgrade;
        }

        function isAvailable() {
            return upgrade.isDiscovered() && !upgrade.isObtained();
        }

        function setCost(value) {
            upgrade.cost = value;
            return upgrade;
        }

        function setCostUnit(value) {
            upgrade.costUnit = value;
            return upgrade;
        }

        function toggleCanBuyAgain() {
            upgrade.canBuyAgain = !upgrade.canBuyAgain;
            return upgrade;
        }
    }
})();