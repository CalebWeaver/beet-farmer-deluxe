let EventDescriber = (function(Event, units, skills, upgrades, events, generator, discoverer, stats, save) {
	'use strict';
	let self = this;

	(function() {

		createEvent(LEARN_TO_FARM, LEARN_TO_FARM_DESC,
			function() {
				return skills[FARMING].level() >= 1;
			}
		);

        createEvent(BEETS_BEGIN, BEETS_BEGIN_DESC,
            function() {
                return units[BEETS].amount() >= 5;
            }
        );

        createEvent(CROWN_OF_ROOTS, CROWN_OF_ROOTS_DESC,
			function() {
        		return upgrades[IRON_HOE].isObtained() && stats.findChance(stats.SECOND_CHANCE / 10);
			}
		).addPath(CROWN_OF_ROOTS_YES)
			.addPath(CROWN_OF_ROOTS_NO);

        createEvent(BEET_KING, BEET_KING_DESC,
            function() {
                return events[CROWN_OF_ROOTS].choosePath(CROWN_OF_ROOTS_YES);
            })
            .setEffect(() => skills[INTELLIGENCE].levelUp());

        createEvent(FARM_SAVANT, FARM_SAVANT_DESC,
            function() {
                return events[CROWN_OF_ROOTS].choosePath(CROWN_OF_ROOTS_NO);
            });

        createEvent(GAINING_KNOWLEDGE, GAINING_KNOWLEDGE_DESC,
            function() {
                return skills[K_FARMING].level() >= 6;
            }
        ).addPath(GAIN_KNOWLEDGE_PATH_YES)
			.addPath(GAIN_KNOWLEDGE_PATH_NO);

        createEvent(BEET_PURIST, BEET_PURIST_DESC,
            function() {
                return events[GAINING_KNOWLEDGE].chosenPath() == GAIN_KNOWLEDGE_PATH_NO;
            }
        );

        createEvent(VEGETAL_EXPLORATION, VEGETAL_EXPLORATION_DESC,
            function() {
                return events[GAINING_KNOWLEDGE].chosenPath() == GAIN_KNOWLEDGE_PATH_YES;
            }
        );

        createEvent(OFF_TO_MARKET, OFF_TO_MARKET_DESC,
            function() {
                return skills[BEET_MARKET].isAvailable();
            }
        );

		createEvent(SELF_AWARENESS, SELF_AWARENESS_DESC,
			function() {
				return stats.totalObservedTime >= 15000;
			}
		);

		createEvent(CENTIPEDES, CENTIPEDES_DESC,
			function() {
				let curseMin = 30;
				return units[FARM_CURSE].amount() >= curseMin && stats.findChance(stats.SECOND_CHANCE / 3);
			}
		);

		createEvent(CROWS, CROWS_DESC,
			function() {
				let curseMin = 60;
				return units[FARM_CURSE].amount() >= curseMin && stats.findChance(stats.SECOND_CHANCE / 3);
			}
		);

		loadEvents();
	})();

	return self;

	function loadEvents() {
		if (save.load) {
			save.load.events.forEach(function(event) {
				events[event.name].hasOccurred(event.hasOccurred);
			});
		}
	}

	function createEvent(name, description, discovery) {
		let event =  new Event(name, description);
		events[name] = event;
		discoverer[name] = discovery;
		return event;
	}

}(Event, Units, Skills, Upgrades, Events, Generator, Discoverer, StatisticTracker, SaveManager));