(function(Event, units, skills, upgrades, upgradeUtil, events, generator, discoverer, stats, save, beetMinigame) {
	'use strict';

	createEvent(LEARN_TO_FARM,
		function() {
			return units[BEETS].amount() >= 1;
		}
	).setEffect(() => {
		beetMinigame.GRID_HEIGHT = 1;
		beetMinigame.GRID_WIDTH = 1;
	});

    createEvent(BEETS_BEGIN,
        function() {
            return units[BEETS].amount() >= 5;
        }
    );

    createEvent(HUNGER_SETS_IN,
        function() {
            return upgrades[EAT_BEETS].isAvailable();
        }
    );

    createEvent(BAARDVARK_FARM,
		() => units[BEETS].generated >= 75)
        .addPath(BAARDVARK_FARM.paths[0], () => units[BEETS].amount() >= 10)
        .addPath(BAARDVARK_FARM.paths[1]);

    createEvent(BAARDVARK_FARM_FEED,
        () => events[BAARDVARK_FARM.title].chosenPath() === BAARDVARK_FARM.paths[0])
        .setEffect(() => {
            skills[INTELLIGENCE].add(1);
        });

    createEvent(BAARDVARK_FARM_WORK,
        () => events[BAARDVARK_FARM.title].chosenPath() === BAARDVARK_FARM.paths[1])
        .setEffect(() => {
			units[BEETS].add(50);
        });

    createEvent(FARM_REMAINS,
		function() {
    		return units[BEETS].generated >= 100;
		}
	).addPath(FARM_REMAINS.paths[0])
        .addPath(FARM_REMAINS.paths[1])
        .addPath(FARM_REMAINS.paths[2], () => units[GOLD].amount() >= 10);

    createEvent(LEAVE_THE_BONES,
        () => events[FARM_REMAINS.title].chosenPath() === FARM_REMAINS.paths[0])
		.setEffect(() => {
			units[GOODNESS].add(1);
		});

    createEvent(DIG_UP_BONES,
        () => events[FARM_REMAINS.title].chosenPath() === FARM_REMAINS.paths[1])
		.setEffect(() => {
    		units[FARM_CURSE].add(1);
		});

    createEvent(FARM_MONUMENT,
		() => events[FARM_REMAINS.title].chosenPath() === FARM_REMAINS.paths[2])
		.setEffect(() => {
			units[GOLD].remove(10);
            units[GOODNESS].add(1);
            skills[K_RELIGION].add(1);
        });

	createEvent(CROWN_OF_ROOTS,
		function() {
			return upgradeUtil.getTool(3,2).isObtained() && stats.findChance(stats.SECOND_CHANCE / 10);
		}
	).addPath(CROWN_OF_ROOTS.paths[0])
		.addPath(CROWN_OF_ROOTS.paths[1]);

	createEvent(BEET_KING,
		function() {
			return events[CROWN_OF_ROOTS.title].chosenPath() === CROWN_OF_ROOTS.paths[0];
		})
		.setEffect(() => skills[INTELLIGENCE].levelUp());

	createEvent(FARM_SAVANT,
		function() {
			return events[CROWN_OF_ROOTS.title].chosenPath() === CROWN_OF_ROOTS.paths[1];
		});

	createEvent(GAINING_KNOWLEDGE,
		function() {
			return skills[K_FARMING].level() >= 10;
		}
	).addPath(GAINING_KNOWLEDGE.paths[0])
		.addPath(GAINING_KNOWLEDGE.paths[1]);

	createEvent(BEET_PURIST,
		function() {
			return events[GAINING_KNOWLEDGE.title].chosenPath() == GAINING_KNOWLEDGE.paths[1];
		}
	);

	createEvent(VEGETAL_EXPLORATION,
		function() {
			return events[GAINING_KNOWLEDGE.title].chosenPath() == GAINING_KNOWLEDGE.paths[0];
		}
	);

	createEvent(BEETS_BEYOND,
		function() {
			return upgrades[WHITE_BEET_SEEDS].isDiscovered();
		}
	);

	createEvent(OFF_TO_MARKET,
		function() {
			return skills[BEET_MARKET].isAvailable();
		}
	);

	createEvent(CENTIPEDES,
		function() {
			let curseMin = 30;
			return units[FARM_CURSE].amount() >= curseMin && stats.findChance(stats.SECOND_CHANCE / 3);
		}
	);

	createEvent(CROWS,
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

	function createEvent(textDetails, discovery) {
		let event =  new Event(textDetails.title, textDetails.description);
		events[textDetails.title] = event;
		discoverer[textDetails.title] = discovery;
		return event;
	}

}(Event, Units, Skills, Upgrades, UpgradeUtil, Events, Generator, Discoverer, StatisticTracker, SaveManager, BeetFarmMinigame));