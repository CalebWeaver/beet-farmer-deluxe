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

        createEvent(GAINING_KNOWLEDGE, GAINING_KNOWLEDGE_DESC,
            function() {
            },
            function() {
                return skills[K_FARMING].level() >= 6;
            }
        );
        addPath(GAINING_KNOWLEDGE, GAIN_KNOWLEDGE_PATH_YES);
        addPath(GAINING_KNOWLEDGE, GAIN_KNOWLEDGE_PATH_NO);

        createEvent(BEET_PURIST, BEET_PURIST_DESC,
            function() {
            },
            function() {
                return events[GAINING_KNOWLEDGE].chosenPath() == GAIN_KNOWLEDGE_PATH_NO;
            }
        );

        createEvent(VEGETAL_EXPLORATION, VEGETAL_EXPLORATION_DESC,
            function() {
            },
            function() {
                return events[GAINING_KNOWLEDGE].chosenPath() == GAIN_KNOWLEDGE_PATH_YES;
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

		createEvent(CENTIPEDES, CENTIPEDES_DESC,
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

	function addPath(name, path) {
		eventsM.events[name].paths.push(path);
	}
}(UnitDescription, SkillDescription, UpgradeDescription, EventDescription, Generator, Discoverer, StatisticTracker, SaveManager));