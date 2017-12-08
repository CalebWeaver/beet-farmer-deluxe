(function(Event, units, skills, upgrades, upgradeUtil, events, generator, discoverer, stats, save, beetMinigame) {
	'use strict';

	createEvent(LEARN_TO_FARM,
		() => skills[FARMING].level() >= 1
	);

    createEvent(BEETS_BEGIN,
        function() {
            return units[BEETS].amount() >= 5 || upgrades[EAT_BEETS].upgradeCount >= 3;
        }
    ).setEffect(() => {
        beetMinigame.GRID_HEIGHT = 1;
        beetMinigame.GRID_WIDTH = 1;
    });

    createEvent(HUNGER_SETS_IN,
		() => {
    		return upgrades[EAT_BEETS].isAvailable();
        }
    );

    createEvent(DAY_ON_FARM,
		() => units[BEETS].amount() >= 20)
		.addPath(DAY_ON_FARM.paths[0]);

    createEvent( DAY_ON_FARM_REWARD,
		() => events[DAY_ON_FARM.title].chosenPath() === DAY_ON_FARM.paths[0])
		.setEffect(() => units[BEETS].add(10))
		.setIsHidden(true);

    createEvent(FIRST_HARVEST,
        () => units[BEETS].generated >= 100)
        .addPath(FIRST_HARVEST.paths[0])
        .addPath(FIRST_HARVEST.paths[1]);

    createEvent(FIRST_HARVEST_PLANT,
        () => events[FIRST_HARVEST.title].chosenPath() === FIRST_HARVEST.paths[0])
        .setEffect(() => {
    		skills[FARMING].add(1);
        });

    createEvent(FIRST_HARVEST_KEEP,
        () => events[FIRST_HARVEST.title].chosenPath() === FIRST_HARVEST.paths[1])
        .setEffect(() => {
			units[BEETS].amount(units[BEETS].amount() + 20);
        });

    createEvent(BAARDVARK_FARM,
        () => units[BEETS].generated >= 500)
        .addPath(BAARDVARK_FARM.paths[0])
        .addPath(BAARDVARK_FARM.paths[1], () => units[BEETS].amount() >= 250);

    createEvent(BAARDVARK_FARM_WORK,
        () => events[BAARDVARK_FARM.title].chosenPath() === BAARDVARK_FARM.paths[0])
        .setEffect(() => {
            units[BEETS].add(100);
        });

    createEvent(BAARDVARK_FARM_FEED,
        () => {
			return events[BAARDVARK_FARM.title].chosenPath() === BAARDVARK_FARM.paths[1]
        })
        .setEffect(() => {
            skills[INTELLIGENCE].add(1);
            units[BEETS].add(-250);
        });

    createEvent(FARM_REMAINS,
		function() {
    		return units[BEETS].generated >= 1500;
		}
	).addPath(FARM_REMAINS.paths[0])
        .addPath(FARM_REMAINS.paths[1])
        .addPath(FARM_REMAINS.paths[2], () => units[GOLD].amount() >= 50);

    createEvent(LEAVE_THE_BONES,
        () => events[FARM_REMAINS.title].chosenPath() === FARM_REMAINS.paths[0])
		.setEffect(() => {
			units[GOODNESS].add(1);
		});

    createEvent(DIG_UP_BONES,
        () => events[FARM_REMAINS.title].chosenPath() === FARM_REMAINS.paths[1])
		.setEffect(() => {
    		units[FARM_CURSE].add(10);
    		skills[FARMING].levelUp();
		});

    createEvent(FARM_MONUMENT,
		() => events[FARM_REMAINS.title].chosenPath() === FARM_REMAINS.paths[2])
		.setEffect(() => {
			units[GOLD].remove(50);
            units[GOODNESS].add(1);
            skills[K_RELIGION].add(1);
        });

    createEvent(FARM_CHEST,
        () => units[BEETS].generated >= 3000)
        .addPath(FARM_CHEST.paths[0]);

    createEvent(FARM_CHEST_OPEN,
        () => events[FARM_CHEST.title].chosenPath() == FARM_CHEST.paths[0])
        .addPath(FARM_CHEST_OPEN.paths[0])
        .addPath(FARM_CHEST_OPEN.paths[1]);

	createEvent(CROWN_OF_ROOTS,
		function() {
			return upgradeUtil.getTool(4,0).isObtained() && stats.findChance(stats.SECOND_CHANCE / 60);
		}
	).addPath(CROWN_OF_ROOTS.paths[0])
		.addPath(CROWN_OF_ROOTS.paths[1]);

    createEvent(FARM_SAVANT,
        function() {
            return events[CROWN_OF_ROOTS.title].chosenPath() === CROWN_OF_ROOTS.paths[0];
        });

	createEvent(BEET_KING,
		function() {
			return events[CROWN_OF_ROOTS.title].chosenPath() === CROWN_OF_ROOTS.paths[1];
		})
		.setEffect(() => skills[INTELLIGENCE].levelUp());

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

    createEvent(CURSE_TEN,
        () => units[FARM_CURSE].amount() >= 10);

    createEvent(CURSE_THIRTY,
        () => units[FARM_CURSE].amount() >= 30);

    createEvent(CURSE_SIXTY,
        () => units[FARM_CURSE].amount() >= 60);

    createEvent(CURSE_FINAL,
        () => units[FARM_CURSE].amount() >= 100);

    createEvent(CURSE_LIFTING,
        () => {
    		return (events[CURSE_TEN.title].hasOccurred() && units[FARM_CURSE].amount() < 10)
			|| (events[CURSE_THIRTY.title].hasOccurred() && units[FARM_CURSE].amount() < 30)
			|| (events[CURSE_SIXTY.title].hasOccurred() && units[FARM_CURSE].amount() < 60)
			|| (events[CURSE_FINAL.title].hasOccurred() && units[FARM_CURSE].amount() < 100);
		});

	createEvent(WEEDS,
		() => {
			let curseTenMin = 20;
			return stats.findChance((stats.MINUTE_CHANCE / (curseTenMin * 10)) * units[FARM_CURSE].amount());
        });

	createEvent(CENTIPEDES,
		function() {
            let curseTenMin = 40;
            return stats.findChance((stats.MINUTE_CHANCE / (curseTenMin * 10)) * units[FARM_CURSE].amount())
				&& units[WEEDS].isAvailable();
		}
	);

    createEvent(CROWS,
        function() {
            let curseTenMin = 70;
            return stats.findChance((stats.MINUTE_CHANCE / (curseTenMin * 10)) * units[FARM_CURSE].amount())
                && events[CENTIPEDES].hasOccurred();
        }
    );

    createEvent(POSSESSED_SCARECROW,
        function() {
            let curseTenMin = 100;
            return stats.findChance((stats.MINUTE_CHANCE / (curseTenMin * 10)) * units[FARM_CURSE].amount())
                && events[CROWS].hasOccurred();
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
		let event = new Event(textDetails.title, textDetails.description);
		events[textDetails.title] = event;
		discoverer[textDetails.title] = discovery;
		return event;
	}

}(Event, Units, Skills, Upgrades, UpgradeUtil, Events, Generator, Discoverer, StatisticTracker, SaveManager, BeetFarmMinigame));