let UnitDescriber = (function(units, skills, upgrades, events, settings, generator, spender, discoverer, stats, save) {
	'use strict';
	let self = this;

	(function() {

        createUnit(BEETS,
            function() {
                let beets = createBeets();
                let temperatureCoeff = .3 / distanceFromTemperature(75);
                return beets * (1 + temperatureCoeff);
            },
            function() {
                return true;
            },
            function() {
                let MARKET_GROWTH = .1;
                let sellAmount = 0;
                if (skills[BEET_MARKET].getUsableLevel() > 0) {
                    sellAmount = skills[BEET_MARKET].getUsableLevel() * MARKET_GROWTH;
                }
                return sellAmount;
            }
        );

        createUnit(WHITE_BEETS,
            function() {
                let beets = createBeets();
                let temperatureCoeff = .3 / distanceFromTemperature(55);
                return beets * (1 + temperatureCoeff);
            },
            function() {
                return upgrades[WHITE_BEET_SEEDS].isObtained();
            },
            function() {
                let MARKET_GROWTH = .1;
                let sellAmount = 0;
                if (skills[BEET_MARKET].getUsableLevel() > 0) {
                    sellAmount = skills[BEET_MARKET].getUsableLevel() * MARKET_GROWTH;
                }
                return sellAmount;
            }
        );

        createUnit(DIRE_BEETS,
            function() {
                let beets = createBeets();
                let temperatureCoeff = .3 / distanceFromTemperature(95);
                return beets * (1 + temperatureCoeff);
            },
            function() {
                return upgrades[DIRE_BEET_SEEDS].isObtained();
            },
            function() {
                let MARKET_GROWTH = .1;
                let sellAmount = 0;
                if (skills[BEET_MARKET].getUsableLevel() > 0) {
                    sellAmount = skills[BEET_MARKET].getUsableLevel() * MARKET_GROWTH;
                }
                return sellAmount;
            }
        );

        createUnit(SENTIENT_BEETS,
            function() {
                let beets = createBeets();
                let temperatureCoeff = .3 / distanceFromTemperature(99);
                return beets * (1 + temperatureCoeff);
            },
            function() {
                return upgrades[SENTIENT_BEET_SEEDS].isObtained();
            },
            function() {
                let MARKET_GROWTH = .1;
                let sellAmount = 0;
                if (skills[BEET_MARKET].getUsableLevel() > 0) {
                    sellAmount = skills[BEET_MARKET].getUsableLevel() * MARKET_GROWTH;
                }
                return sellAmount;
            }
        );

        createUnit(SAZE_RUNIC_BEETS,
            function() {
                let beets = createBeets();
                let temperatureCoeff = .3 / distanceFromTemperature(30);
                return beets * (1 + temperatureCoeff);
            },
            function() {
                return upgrades[SAZE_RUNIC_BEET_SEEDS].isObtained();
            },
            function() {
                let MARKET_GROWTH = .1;
                let sellAmount = 0;
                if (skills[BEET_MARKET].getUsableLevel() > 0) {
                    sellAmount = skills[BEET_MARKET].getUsableLevel() * MARKET_GROWTH;
                }
                return sellAmount;
            }
        );

		function createBeets() {
            let centipedes = 0;
            if (events[CENTIPEDES].hasOccurred() && skills[PEST_CONTROL].getLevel() <= 5) {
                centipedes = (skills[PEST_CONTROL].getLevel() - 5) * .006;
            }
            return farmingBase() + centipedes;
		}

		function distanceFromTemperature(temp) {
			return (Math.abs(temp - settings[GREENHOUSE_TEMPERATURE].setting()) + 1);
		}

		createUnit(CORN,
			function() {
				let corn = 0;
				if (upgrades[PLANT_CORN].isObtained()) {
					corn = farmingBase() / 5;
				}
				return corn;
			},
			function() {
				return upgrades[PLANT_CORN].isObtained();
			}
		);

		function farmingBase() {
			let BASE_FARM = 1;
			let FARMING_MULT = .1;
			let K_FARMING_MULT = .1;
			let TILLED_MULT = .3;
			let TILLING_PENTALTY = 5;
			let IRON_HOE_BONUS = .1;
			let STEEL_HOE_BONUS = .1;
			let PLANTED_CROWN_BONUS = .2;

			let farmingProduction = skills[FARMING].getUsableLevel() * FARMING_MULT * (skills[K_FARMING].getUsableLevel() * K_FARMING_MULT + 1);
			let tilled = 1 + (upgrades[TILLING].isObtained() ? TILLED_MULT : 0);
			let toolBonus = 1 + ((upgrades[IRON_HOE].isObtained() ? IRON_HOE_BONUS : 0) + (upgrades[STEEL_HOE].isObtained() ? STEEL_HOE_BONUS : 0));
			let tilling = upgrades[TILLING].inProgress() ? TILLING_PENTALTY : 1;
			let plantedCrown = 1 + ((events[CROWN_OF_ROOTS].chosenPath() === CROWN_OF_ROOTS_NO ? PLANTED_CROWN_BONUS : 0));

			let farmingTotal = (BASE_FARM * farmingProduction * tilled * toolBonus * plantedCrown) / tilling;

			return farmingTotal;
		}

		createUnit(WEEDS,
			function() {
				let K_FARMING_RATE = .5;
				let WEED_BASE = .1;
				let weeds = units[FARM_CURSE].amount() * WEED_BASE - (K_FARMING_RATE * skills[K_FARMING].getUsableLevel());
				return weeds;
			},
			function() {
				return skills[K_FARMING].isAvailable();
			}
		);

		createUnit(FARM_CURSE,
			function() {
				if (units[FARM_CURSE].amount() < 100) {
					let curseBase = 1 + (math.randomInt(3) * .1);
					let corn = units[CORN].amount() * .01;
					return curseBase * corn;
				}
				return 0;
			},
			function() {
				return true;
			}
		);
		//#PROD units[FARM_CURSE].isHidden = true;

		createUnit(GOLD,
			function() {
				let gold = 0;
				gold += sellBeets();
				return gold;
			},
			function() {
				return skills[BEET_MARKET].isAvailable();
			}
		);

		function sellBeets() {

            let GOLD_PER_BEET = (Math.min(skills[BEET_MARKET].getUsableLevel(), 200) * .02);
            let GOLD_PER_WHITE_BEET = (Math.min(skills[BEET_MARKET].getUsableLevel(), 200) * .05);
            let GOLD_PER_DIRE_BEET = (Math.min(skills[BEET_MARKET].getUsableLevel(), 200) * .1);
            let GOLD_PER_SENTIENT_BEET = (Math.min(skills[BEET_MARKET].getUsableLevel(), 200) * .4);
            let GOLD_PER_SAZE_RUNIC_BEET = (Math.min(skills[BEET_MARKET].getUsableLevel(), 200));

			let beetGold = 0;
            if (spender.hasSpent[BEETS]) {
                beetGold += spender.spendingPerSec[BEETS]() * GOLD_PER_BEET;
            }
            if (spender.hasSpent[WHITE_BEETS]) {
                beetGold += spender.spendingPerSec[WHITE_BEETS]() * GOLD_PER_WHITE_BEET;
            }
            if (spender.hasSpent[DIRE_BEETS]) {
                beetGold += spender.spendingPerSec[DIRE_BEETS]() * GOLD_PER_DIRE_BEET;
            }
            if (spender.hasSpent[SENTIENT_BEETS]) {
                beetGold += spender.spendingPerSec[SENTIENT_BEETS]() * GOLD_PER_SENTIENT_BEET;
            }
            if (spender.hasSpent[SAZE_RUNIC_BEETS]) {
                beetGold += spender.spendingPerSec[SAZE_RUNIC_BEETS]() * GOLD_PER_SAZE_RUNIC_BEET;
            }

			return beetGold;
		}

		createUnit(WOOD,
			function() {
				return skills[WOODCUTTING].getUsableLevel() / 3;
			},
			function() {
				return skills[WOODCUTTING].isAvailable();
			}
		);

		createUnit(STONE,
			function() {
				return skills[MINING].getUsableLevel() / 7;
			},
			function() {
				return skills[MINING].isAvailable();
			}
		);

		createUnit(FISH,
			function() {
				return skills[FISHING].getUsableLevel() / 10;
			},
			function() {
				return skills[FISHING].isAvailable();
			}
		);

		createUnit(PRESTIGE,
			function() {

			},
			function() {
				return false;
			}
		);

		loadUnits();
	})();

	return self;

	function loadUnits() {
		if (save.load) {
			save.load.units.forEach(function(unit) {
				units[unit.name].amount(unit.amount);
				units[unit.name].isDiscovered(unit.isDiscovered);
			});
		}
	}

	function createUnit(name, increment, discovery, decrement) {
		units[name] = new Unit(name);
		generator.setGeneration(name, increment);
		if (decrement) {
            spender.setSpending(name, decrement);
        }
		discoverer[name] = discovery;
	}
})(Units, Skills, Upgrades, Events, Settings, Generator, Spender, Discoverer, StatisticTracker, SaveManager);