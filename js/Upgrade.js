var Upgrade = (function() {
    'use strict';

    return Upgrade;

    function Upgrade(name, time, effect) {
        var upgrade = this;
        upgrade.name = name;
        upgrade.begin = begin;
        upgrade.time = time;
        upgrade.inProgress = ko.observable(false);
        upgrade.isDiscovered = ko.observable(false);
        upgrade.isObtained = ko.observable(false);
        upgrade.effect = effect;
        upgrade.costDesc = '';
        upgrade.isAvailable = ko.computed(isAvailable);
        upgrade.setName = setName;
        upgrade.setTime = setTime;
        upgrade.setEffect = setEffect;
        upgrade.setCostDesc = setCostDesc;

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

        function setEffect(value) {
            upgrade.effect = effect;
            return upgrade;
        }

        function setCostDesc(value) {
            upgrade.costDesc = value;
            return upgrade;
        }

        function animateButton() {
            var buttonTarget = $(event.currentTarget);
            buttonTarget.addClass("in-progress");
            buttonTarget.children().first().css({"transition-duration": (time/1000)+"s", "width": "100%"});
        }

        function isAvailable() {
            return upgrade.isDiscovered() && !upgrade.isObtained();
        }
    }
})();