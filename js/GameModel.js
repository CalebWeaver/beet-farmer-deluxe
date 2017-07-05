let GameModel = (function(skills, units, events, upgrades, settings, discoverer, generator, spender, stats, player, save) {
	'use strict';
	let self = {};

	self.units = ko.observableArray();
	self.skills = ko.observableArray();
	self.events = ko.observableArray();
	self.upgrades = ko.observableArray();
	self.settings = ko.observableArray();
	self.player = player;
	self.timePlayed = ko.computed(function() {
		return stats.hours() + " hrs " + stats.min() + " min " + stats.sec() + " sec";
	});
	self.displayedEvents = ko.observableArray();
	self.barUnlocked = ko.computed(isBarUnlocked);
	self.isUpgradePurchasable = isUpgradePurchasable;
	self.buyUpgrade = buyUpgrade;
    self.getDiscoveredUpgrades = getDiscoveredUpgrades;
    self.getAvailableSettings = getAvailableSettings;

	(function() {

		self.skills(Object.values(skills.skills));
		self.units(Object.values(units.units));
		self.upgrades(Object.values(upgrades.upgrades));
        self.events(Object.values(events.events));
        self.settings(Object.values(settings.settings));

		setInterval(updateAll, stats.UPDATE_TICK);

		// skills.skills[FARMING].incrementLevel();

		document.onkeypress = function(e) {
			if (e.keyCode === 13) {
				setTestData();
			}
		};

		setInterval(function() {save.save(self)}, 1000);
		setTestData();
	})();
	self.setTestData = setTestData;

	return self;

	function setTestData() {
		let unitsM = units.units;
		let skillsM = skills.skills;
		let upgradesM = upgrades.upgrades;
		let eventsM = events.events;

		// beetFarmMinigame.addBeet();

		player.gainXp(1000);
		// unitsM[GOLD].amount(10);
        //
		units.units[BEETS].amount(10);
		// units.units[CORN].isDiscovered(true);
		// units.units[CORN].amount(10);
		// upgradesM[PLANT_CORN].isObtained(true);
		// skills.skills[K_FARMING].isAvailable(true);
		// skills.skills[K_FARMING].setLevel(6);
		// skillsM[FARMING].setLevel(15);
		// unitsM[FARM_CURSE].amount(20);
		// upgradesM[PICK].isDiscovered(true);
	}

	function updateAll() {
		updateLevelBar();
		let xpToGain = (1 + (skills.skills[INTELLIGENCE].level() / 10)) * .1;
		player.gainXp(xpToGain);

		stats.updateTimePlayed();
		stats.changeRandomEvent();

		generate();

		checkDiscovery();
	}

	function generate() {
        ko.utils.arrayForEach(self.units(), function(unit) {
            let amount = generator[unit.name]();
            unit.amountPerSecond((amount * stats.TICK_PER_SECOND).toFixed(2));
            if (spender[unit.name]) {
                unit.spentPerSecond((spender[unit.name]() * stats.TICK_PER_SECOND).toFixed(2));
            }
        });
	}

	function updateLevelBar() {

        if(isBarUnlocked()) {
			let levelFill = document.getElementsByClassName("level-progress-fill")[0];
			let levelBar = document.getElementsByClassName("level-bar")[0];
			let levelWidthProp = window.getComputedStyle(levelBar).getPropertyValue('width');
			let levelWidth = parseInt(levelWidthProp.substr(0, levelWidthProp.length - 2));

            levelFill.style.width = (player.xp / player.xpForLevel()) * levelWidth + 'px';
        }
	}

	function checkDiscovery() {
		ko.utils.arrayForEach(self.units(), function(unit) {
			if (discoverer[unit.name] && discoverer[unit.name]()) {
				delete discoverer[unit.name];
				unit.isDiscovered(true);
			}
		});

		ko.utils.arrayForEach(self.skills(), function(skill) {
			if (discoverer[skill.name] && discoverer[skill.name]()) {
				delete discoverer[skill.name];
				skill.isAvailable(true);
			}
		});

		ko.utils.arrayForEach(self.upgrades(), function(upgrade) {
			if (discoverer[upgrade.name] && discoverer[upgrade.name]()) {
				delete discoverer[upgrade.name];
				upgrade.isDiscovered(true);
			}
		});

        ko.utils.arrayForEach(self.events(), function(event) {
            if (discoverer[event.name] && discoverer[event.name]()) {
                self.displayedEvents.unshift(event);
                delete discoverer[event.name];
                event.occurs();
            }
        });

        ko.utils.arrayForEach(self.settings(), function(setting) {
            if (discoverer[setting.name] && discoverer[setting.name]()) {
                delete discoverer[setting.name];
                setting.isAvailable(true);
            }
        });
	}

	function isUpgradePurchasable(upgrade) {
    	let isPurchasable = upgrade.isAvailable();

    	if (upgrade.costUnit && upgrade.cost && isPurchasable) {
    	     isPurchasable = units.units[upgrade.costUnit].amount() >= upgrade.cost;
		}

		return isPurchasable;
    }

    function buyUpgrade(upgrade) {
		upgrade.begin();
        if (upgrade.costUnit && upgrade.cost) {
            units.units[upgrade.costUnit].remove(upgrade.cost);
        }
    }

    function isBarUnlocked() {
		return skills.skills[INTELLIGENCE].level() > 3;
	}

    function getDiscoveredUpgrades() {
        return upgrades.getDiscoveredUpgrades();
    }

    function getAvailableSettings() {
        return settings.getAvailableSettings();
    }
})(Skills, Units, Events, Upgrades, Settings, Discoverer, Generator, Spender, StatisticTracker, Player, SaveManager);