var UnitDescriber = (function(unitsM, skillsM, upgradesM, eventsM, generator, discoverer, stats, save) {
	'use strict';
	var self = this;

	(function() {

		var units = unitsM.units;
		var skills = skillsM.skills;
		var upgrades = upgradesM.upgrades;
		var events = eventsM.events;

		createUnit(BEETS,
			function() {
				if (events[CENTIPEDES].hasOccurred() && skills[PEST_CONTROL].getLevel() <= 5) {
					var centipedes = (skills[PEST_CONTROL].getLevel() - 5) * .006;
				} else {
					var centipedes = 0;
				}
				return farmingBase() + centipedes;
			},
			function() {
				return true;
			}
		);

		createUnit(CORN,
			function() {
				var corn = 0;
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
			var BASE_FARM = 1;
			var FARMING_MULT = .2;
			var K_FARMING_MULT = .1;
			var TILLED_MULT = .5;
			var TILLING_PENTALTY = 5;
			var IRON_HOE_BONUS = .5;
			var STEEL_HOE_BONUS = .5;

			var farmingProduction = skills[FARMING].getLevel() * FARMING_MULT * (skills[K_FARMING].getLevel() * K_FARMING_MULT + 1);
			var tilled = 1 + (upgrades[TILLING].isObtained() ? TILLED_MULT : 0);
			var toolBonus = 1 + ((upgrades[IRON_HOE].isObtained() ? IRON_HOE_BONUS : 0) + (upgrades[STEEL_HOE].isObtained() ? STEEL_HOE_BONUS : 0));
			var tilling = upgrades[TILLING].inProgress() ? TILLING_PENTALTY : 1;

			var farmingTotal = (BASE_FARM * farmingProduction * tilled * toolBonus) / tilling;

			return farmingTotal;
		}

		createUnit(WEEDS,
			function() {
				var K_FARMING_RATE = .5;
				var WEED_BASE = .1;
				var weeds = units[FARM_CURSE].amount() * WEED_BASE - (K_FARMING_RATE * skills[K_FARMING].getLevel());
				return weeds;
			},
			function() {
				return skills[K_FARMING].isAvailable();
			}
		);

		createUnit(FARM_CURSE,
			function() {
				if (units[FARM_CURSE].amount() < 100) {
					var curseBase = 1 + (math.randomInt(3) * .1);
					var corn = units[CORN].amount() * .01;
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
				var gold = 0;
				gold += sellBeets();
				return gold;
			},
			function() {
				return skills[BEET_MARKET].isAvailable();
			}
		);

		function sellBeets() {

			var BEETS_TO_GOLD = 50 - (Math.min(skills[BEET_MARKET].getLevel(), 200) * .1);
			var MARKET_BASE = .03;
			var MARKET_GROWTH = .01;

			var sellAmount = skills[BEET_MARKET].getLevel() > 0 ? MARKET_BASE + (skills[BEET_MARKET].getLevel() * MARKET_GROWTH):0;

			var beetGold = 0;
			if (units[BEETS].amount() >= sellAmount) {
				units[BEETS].remove(sellAmount);
				beetGold = sellAmount / BEETS_TO_GOLD;
			}

			return beetGold;
		}

		createUnit(WOOD,
			function() {
				return skills[WOODCUTTING].getLevel() / 3;
			},
			function() {
				return skills[WOODCUTTING].isAvailable();
			}
		);

		createUnit(STONE,
			function() {
				return skills[MINING].getLevel() / 7;
			},
			function() {
				return skills[MINING].isAvailable();
			}
		);

		createUnit(FISH,
			function() {
				return skills[FISHING].getLevel() / 10;
			},
			function() {
				return skills[FISHING].isAvailable();
			}
		);

		createUnit(PRESTIGE,
			function() {

				var beetMarketP = skills[BEET_MARKET].getLevel();
				var craftingP = skills[CRAFTING].getLevel();
				var governP = skills[GOVERN].getLevel() * 10;
				var guildTotal = 0;
				for (var i = 0; i < skillsM[GUILD].length; i++) {
					guildTotal += (skillsM[GUILD][i].getLevel() / 50);
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

	function createUnit(name, increment, discovery) {
		unitsM.units[name] = new Unit(name);
		generator.setGeneration(name, increment);
		discoverer[name] = discovery;
	}
})(Units, Skills, Upgrades, Events, Generator, Discoverer, StatisticTracker, SaveManager);