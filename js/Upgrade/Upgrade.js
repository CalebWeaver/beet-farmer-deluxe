let Upgrade = (function() {
    'use strict';

    Upgrade.prototype.isAvailable = function() {
        return this.isDiscovered() && !this.isObtained();
    };

    function Upgrade(name, time) {
        let upgrade = this;
        upgrade.name = name;
        upgrade.time = time;
        upgrade.inProgress = ko.observable(false);
        upgrade.isDiscovered = ko.observable(false);
        upgrade.isObtained = ko.observable(false);
        upgrade.cost = ko.observable(0);
        upgrade.costUnit = '';
        upgrade.isAvailable = ko.computed(this.isAvailable.bind(this));
        upgrade.canBuyAgain = false;
        upgrade.upgradeCount = ko.observable(0);
    }

    Upgrade.prototype.begin = function() {
        this.inProgress(true);
        return new Promise((resolve, reject) => {
            let upgrade = this;
            setTimeout(function() {
                if (!upgrade.canBuyAgain) {
                    upgrade.isObtained(true);
                    ObtainedUpgrades.push(upgrade.name);
                }
                upgrade.upgradeCount(upgrade.upgradeCount() + 1);
                upgrade.inProgress(false);
                upgrade.effect();
                resolve();
            }, this.time);
        });
    };

    Upgrade.prototype.setName = function(value) {
        this.name = value;
        return this;
    };

    Upgrade.prototype.setTime = function(value) {
        this.time = value;
        return this;
    };

    Upgrade.prototype.setEffect = function(effect) {
        this.effect = effect;
        return this;
    };

    Upgrade.prototype.setCostDesc = function(value) {
        this.costDesc = value;
        return this;
    };

    Upgrade.prototype.setCost = function(value) {
        this.cost(value);
        return this;
    };

    Upgrade.prototype.setCostUnit = function(value) {
        this.costUnit = value;
        return this;
    };

    Upgrade.prototype.toggleCanBuyAgain = function() {
        this.canBuyAgain = !this.canBuyAgain;
        return this;
    };

    return Upgrade;

})();