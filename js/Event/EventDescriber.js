(function(Event, units, skills, upgrades, upgradeUtil, events, generator, discoverer, stats, save, beetMinigame) {
	'use strict';

	createEvent(LEARN_TO_FARM.title, LEARN_TO_FARM.description,
		function() {
			return units[BEETS].amount() >= 1;
		}
	).setEffect(() => {
		beetMinigame.GRID_HEIGHT = 1;
		beetMinigame.GRID_WIDTH = 1;
	});

    createEvent(BEETS_BEGIN.title, BEETS_BEGIN.description,
        function() {
            return units[BEETS].amount() >= 5;
        }
    );

    createEvent(HUNGER_SETS_IN.title, HUNGER_SETS_IN.description,
        function() {
            return upgrades[EAT_BEETS].isAvailable();
        }
    );

	createEvent(CROWN_OF_ROOTS.title, CROWN_OF_ROOTS.description,
		function() {
			return upgradeUtil.getTool(3,2).isObtained() && stats.findChance(stats.SECOND_CHANCE / 10);
		}
	).addPath(CROWN_OF_ROOTS.pathA)
		.addPath(CROWN_OF_ROOTS.pathB);

	createEvent(BEET_KING.title, BEET_KING.description,
		function() {
			return events[CROWN_OF_ROOTS.title].chosenPath() === CROWN_OF_ROOTS.pathA;
		})
		.setEffect(() => skills[INTELLIGENCE].levelUp());

	createEvent(FARM_SAVANT.title, FARM_SAVANT.description,
		function() {
			return events[CROWN_OF_ROOTS.title].chosenPath() === CROWN_OF_ROOTS.pathB;
		});

	createEvent(GAINING_KNOWLEDGE.title, GAINING_KNOWLEDGE.description,
		function() {
			return skills[K_FARMING].level() >= 10;
		}
	).addPath(GAINING_KNOWLEDGE.pathA)
		.addPath(GAINING_KNOWLEDGE.pathB);

	createEvent(BEET_PURIST.title, BEET_PURIST.description,
		function() {
			return events[GAINING_KNOWLEDGE.title].chosenPath() == GAINING_KNOWLEDGE.pathB;
		}
	);

	createEvent(VEGETAL_EXPLORATION.title, VEGETAL_EXPLORATION.description,
		function() {
			return events[GAINING_KNOWLEDGE.title].chosenPath() == GAINING_KNOWLEDGE.pathA;
		}
	);

	createEvent(BEETS_BEYOND.title, BEETS_BEYOND.description,
		function() {
			return upgrades[WHITE_BEET_SEEDS].isDiscovered();
		}
	);

	createEvent(OFF_TO_MARKET.title, OFF_TO_MARKET.description,
		function() {
			return skills[BEET_MARKET].isAvailable();
		}
	);

	createEvent(SELF_AWARENESS.title, SELF_AWARENESS.description,
		function() {
			// return stats.totalObservedTime >= 15000;
		}
	);

	createEvent(CENTIPEDES.title, CENTIPEDES.description,
		function() {
			let curseMin = 30;
			return units[FARM_CURSE].amount() >= curseMin && stats.findChance(stats.SECOND_CHANCE / 3);
		}
	);

	createEvent(CROWS.title, CROWS.description,
		function() {
			let curseMin = 60;
			return units[FARM_CURSE].amount() >= curseMin && stats.findChance(stats.SECOND_CHANCE / 3);
		}
	);

	loadEvents();

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

}(Event, Units, Skills, Upgrades, UpgradeUtil, Events, Generator, Discoverer, StatisticTracker, SaveManager, BeetFarmMinigame));