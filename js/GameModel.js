let GameModel = (function(skills, units, events, upgrades, settings, discoverer, generator, spender, stats, player,
						  save, unitUtil, upgradeUtil, settingUtil, beetFarmMinigame, constitutionTracker) {
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
    self.getDiscoveredUnits = getDiscoveredUnits;
    self.isLevelUnlocked = isLevelUnlocked;

	(function() {

		self.skills(Object.values(skills));
		self.units(Object.values(units));
		self.upgrades(Object.values(upgrades));
        self.events(Object.values(events));
        self.settings(Object.values(settings));

		setInterval(updateAll, stats.UPDATE_TICK);

		// skills.skills[FARMING].levelUp();

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

		// player.gainXp(5000);
		// settings[HARVEST_TECHNIQUE].isAvailable(true);
		// units[GOLD].amount(10);

        units[BEETS].amount(100);
        // skills[FARMING].setLevel(10);
        // skills[K_FARMING].setLevel(10);
        // skills[EDAPHOLOGY].setLevel(10);
        // skills[K_FARMING].setLevel(3);
        // skills[BEET_MARKET].setLevel(5);
        // upgrades[WHITE_BEET_SEEDS].isObtained(true);
	}

	function updateAll() {
		updateLevelBar();
		player.gainXp();
		constitutionTracker.gainConstitution();

		stats.updateTimePlayed();
		stats.changeRandomEvent();

		generate();

		checkDiscovery();
	}

	function generate() {
        ko.utils.arrayForEach(self.units(), function(unit) {
        	if (unit.isDiscovered()) {
                let amount = generator[unit.name]();
                unit.amountPerSecond((amount * stats.TICK_PER_SECOND).toFixed(2));
                if (spender[unit.name]) {
                    unit.spentPerSecond((spender[unit.name]() * stats.TICK_PER_SECOND).toFixed(2));
                }
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

    	if (upgrade.costUnit && upgrade.cost() && isPurchasable) {
    	     isPurchasable = units[upgrade.costUnit].amount() >= upgrade.cost();
		}

		return isPurchasable;
    }

    function buyUpgrade(upgrade) {
		animateButton(upgrade);
        let button = $(event.currentTarget);
		upgrade.begin().then(() => {
			if (upgrade.canBuyAgain) {
				removeProgress(button);
            }
        });
        if (upgrade.costUnit && upgrade.cost) {
            units[upgrade.costUnit].remove(upgrade.cost());
        }
    }

    function animateButton(upgrade) {
        let button = $(event.currentTarget);
        button.addClass("in-progress");
        button.children().first().css({"transition-duration": (upgrade.time/1000)+"s", "width": "100%"});
    }

    function removeProgress(button) {
        button.children().first().css({"transition-duration":"0s", "width": "0"});
    }

    function isBarUnlocked() {
		return skills[INTELLIGENCE].level() >= 3;
	}

	function isLevelUnlocked() {
		return player.totalLevel() > 1;
	}

    function getDiscoveredUpgrades() {
        return upgradeUtil.getDiscoveredUpgrades();
    }

    function getAvailableSettings() {
        return settingUtil.getAvailableSettings();
    }

    function getDiscoveredUnits() {
		return unitUtil.getDiscoveredUnits();
	}
})(Skills, Units, Events, Upgrades, Settings, Discoverer, Generator, Spender, StatisticTracker, Player, SaveManager, UnitUtil,
	UpgradeUtil, SettingUtil, BeetFarmMinigame, ConstitutionTracker);