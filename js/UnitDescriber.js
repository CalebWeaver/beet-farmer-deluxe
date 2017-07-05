let UnitDescriber = (function(unitsM, skillsM, upgradesM, eventsM, generator, spender, discoverer, stats, save) {
	'use strict';
	let self = this;

	(function() {

		let units = unitsM.units;
		let skills = skillsM.skills;
		let upgrades = upgradesM.upgrades;
		let events = eventsM.events;

		createUnit(BEETS,
			function() {
                units[BEETS].isSpent = false;
				let beets = createBeets();
                return beets;
			},
			function() {
				return true;
			},
			function() {
                let MARKET_BASE = .08;
                let MARKET_GROWTH = .02;
                let sellAmount = 0;
                if (skills[BEET_MARKET].getUsableLevel() > 0) {
                    sellAmount = MARKET_BASE + (skills[BEET_MARKET].getUsableLevel() * MARKET_GROWTH);
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
			let TILLED_MULT = .5;
			let TILLING_PENTALTY = 5;
			let IRON_HOE_BONUS = .5;
			let STEEL_HOE_BONUS = .5;

			let farmingProduction = skills[FARMING].getUsableLevel() * FARMING_MULT * (skills[K_FARMING].getUsableLevel() * K_FARMING_MULT + 1);
			let tilled = 1 + (upgrades[TILLING].isObtained() ? TILLED_MULT : 0);
			let toolBonus = 1 + ((upgrades[IRON_HOE].isObtained() ? IRON_HOE_BONUS : 0) + (upgrades[STEEL_HOE].isObtained() ? STEEL_HOE_BONUS : 0));
			let tilling = upgrades[TILLING].inProgress() ? TILLING_PENTALTY : 1;

			let farmingTotal = (BASE_FARM * farmingProduction * tilled * toolBonus) / tilling;

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

			let BEETS_TO_GOLD = 10 - (Math.min(skills[BEET_MARKET].getUsableLevel(), 200) * .1);

			let MARKET_BASE = .08;
			let MARKET_GROWTH = .02;

			let sellAmount = 0;
			if (skills[BEET_MARKET].getUsableLevel() > 0) {
				sellAmount = MARKET_BASE + (skills[BEET_MARKET].getUsableLevel() * MARKET_GROWTH);
			}

			let beetGold = 0;
			if (spender.hasSpent[BEETS]) {
                beetGold = sellAmount / BEETS_TO_GOLD;
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

				let beetMarketP = skills[BEET_MARKET].getUsableLevel();
				let craftingP = skills[CRAFTING].getUsableLevel();
				let governP = skills[GOVERN].getUsableLevel() * 10;
				let guildTotal = 0;
				for (let i = 0; i < skillsM[GUILD].length; i++) {
					guildTotal += (skillsM[GUILD][i].getUsableLevel() / 50);
				}
				return beetMarketP + craftingP + guildTotal + governP;
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
				unitsM.units[unit.name].amount(unit.amount);
				unitsM.units[unit.name].isDiscovered(unit.isDiscovered);
			});
		}
	}

	function createUnit(name, increment, discovery, decrement) {
		unitsM.units[name] = new Unit(name);
		generator.setGeneration(name, increment);
		if (decrement) {
            spender.setSpending(name, decrement);
        }
		discoverer[name] = discovery;
	}
})(Units, Skills, Upgrades, Events, Generator, Spender, Discoverer, StatisticTracker, SaveManager);