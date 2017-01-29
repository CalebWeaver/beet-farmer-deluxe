var EventDescriber = (function(unitsM, skillsM, upgradesM, eventsM, generator, discoverer, stats, save) {
	'use strict';
	self = this;

	(function() {

		var units = unitsM.units;
		var skills = skillsM.skills;
		var upgrades = upgradesM.upgrades;
		var events = eventsM.events;

		createEvent(LEARN_TO_FARM, LEARN_TO_FARM_DESC,
			function() {
			},
			function() {
				return skills[FARMING].level() >= 1;
			}
		);

		createEvent(BEETS_BEGIN, BEETS_BEGIN_DESC,
			function() {
			},
			function() {
				return units[BEETS].amount() >= 5;
			}
		);

		createEvent(OFF_TO_MARKET, OFF_TO_MARKET_DESC,
			function() {
			},
			function() {
				return skills[BEET_MARKET].isAvailable();
			}
		);

		createEvent(SELF_AWARENESS, SELF_AWARENESS_DESC,
			function() {
			},
			function() {
				return stats.totalObservedTime >= 15000;
			}
		);

		createEvent(CENTEPEDES, CENTEPEDES_DESC,
			function() {
			},
			function() {
				var curseMin = 30;
				return units[FARM_CURSE].amount() >= curseMin && stats.findChance(stats.SECOND_CHANCE / 3);
			}
		);

		createEvent(CROWS, CROWS_DESC,
			function() {
			},
			function() {
				var curseMin = 60;
				return units[FARM_CURSE].amount() >= curseMin && stats.findChance(stats.SECOND_CHANCE / 3);
			}
		);

		loadEvents();
	})();

	return self;

	function loadEvents() {
		var events = eventsM.events;
		if (save.load) {
			save.load.events.forEach(function(event) {
				events[event.name].hasOccurred(event.hasOccurred);
			});
		}
	}

	function createEvent(name, description, effect, discovery) {
		eventsM.events[name] = eventsM.Event(name, description, effect);
		discoverer[name] = discovery;
	}
}(UnitDescription, SkillDescription, UpgradeDescription, EventDescription, Generator, Discoverer, StatisticTracker, SaveManager));