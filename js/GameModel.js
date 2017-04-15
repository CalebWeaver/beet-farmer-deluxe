var GameModel = (function(skills, units, events, upgrades, settings, discoverer, generator, stats, player, save) {
	'use strict';
	var self = {};

	var GAME_SPEED = 1; //Only seems to work to 2
	var GENERATE_SPEED = .01;

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

	(function() {

		self.skills(Object.values(skills.skills));
		self.units(Object.values(units.units));
		self.upgrades(Object.values(upgrades.upgrades));
        self.events(Object.values(events.events));
        self.settings(Object.values(settings.settings));

		setInterval(updateAll, stats.UPDATE_TICK/GAME_SPEED);

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
		var unitsM = units.units;
		var skillsM = skills.skills;
		var upgradesM = upgrades.upgrades;
		var eventsM = events.events;

		// beetFarmMinigame.addBeet();

		player.gainXp(10000);
        //
		// units.units[BEETS].amount(100);
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
		var xpToGain = (1 + (skills.skills[INTELLIGENCE].level() / 10)) * .5;
		player.gainXp(xpToGain);

		stats.updateTimePlayed();
		stats.changeRandomEvent();

		ko.utils.arrayForEach(self.units(), function(unit) {
			var amount = generator[unit.name]() * GENERATE_SPEED;
			unit.add(amount);
			unit.amountPerSecond((amount * GAME_SPEED * (1000 / stats.UPDATE_TICK)).toFixed(2));
		});

		checkDiscovery();
	}

	function updateLevelBar() {

        var levelFill = document.getElementsByClassName("level-progress-fill")[0];
        var levelBar = document.getElementsByClassName("level-bar")[0];
        var levelWidthProp = window.getComputedStyle(levelBar).getPropertyValue('width');
        var levelWidth = parseInt(levelWidthProp.substr(0, levelWidthProp.length - 2));

    	levelFill.style.width = (player.xp / player.xpForLevel()) * levelWidth +'px';
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
})(Skills, Units, Events, Upgrades, Settings, Discoverer, Generator, StatisticTracker, Player, SaveManager);