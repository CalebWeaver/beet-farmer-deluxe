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
        upgrade.setName = setName;
        upgrade.setTime = setTime;
        upgrade.setEffect = setEffect;
        upgrade.setCostDesc = setCostDesc;
        upgrade.setCost = setCost;
        upgrade.setCostUnit = setCostUnit;

        function begin() {

            animateButton();

            upgrade.inProgress(true);
            return new Promise(function() {
                setTimeout(function() {
                    upgrade.isObtained(true);
                    upgrade.inProgress(false);
                    upgrade.effect();
                }, time);
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

        function animateButton() {
            let buttonTarget = $(event.currentTarget);
            buttonTarget.addClass("in-progress");
            buttonTarget.children().first().css({"transition-duration": (time/1000)+"s", "width": "100%"});
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
    }
})();