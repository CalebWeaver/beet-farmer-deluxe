(function(units, skills, upgrades, events, settings, generator, spender, discoverer, stats, save) {
	'use strict';

	createUnit(BEETS,
		function() {
			let beets = createBeets();
			let temperatureMult = .3 / distanceFromTemperature(75);
			let phMult = .3 / distanceFromPh(6);
			return beets * (1 + temperatureMult + phMult);
		},
		function() {
			return skills[FARMING].level() > 0;
		},
		function() {
			let MARKET_GROWTH = .2;
			let sellAmount = 0;
			if (skills[BEET_MARKET].getUsableLevel() > 0) {
				sellAmount = skills[BEET_MARKET].getUsableLevel() * MARKET_GROWTH;
			}
			sellAmount += settings[BREED_BEETS].setting();
			return sellAmount;
		}
	);

	createUnit(WHITE_BEETS,
		function() {
			let beets = createBeets();
			let temperatureMult = .3 / distanceFromTemperature(55);
            let phMult = .3 / distanceFromPh(8);
			return beets * (1 + temperatureMult + phMult);
		},
		function() {
			return upgrades[WHITE_BEET_SEEDS].isObtained();
		},
		function() {
			let MARKET_GROWTH = .2;
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
			let temperatureMult = .3 / distanceFromTemperature(95);
            let phMult = .3 / distanceFromPh(3);
			return beets * (1 + temperatureMult + phMult);
		},
		function() {
			return upgrades[DIRE_BEET_SEEDS].isObtained();
		},
		function() {
			let MARKET_GROWTH = .2;
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
			let temperatureMult = .3 / distanceFromTemperature(99);
            let phMult = .3 / distanceFromPh(7);
			return beets * (1 + temperatureMult + phMult);
		},
		function() {
			return upgrades[SENTIENT_BEET_SEEDS].isObtained();
		},
		function() {
			let MARKET_GROWTH = .2;
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
			let temperatureMult = .3 / distanceFromTemperature(30);
            let phMult = .3 / distanceFromPh(12);
			return beets * (1 + temperatureMult + phMult);
		},
		function() {
			return upgrades[SAZE_RUNIC_BEET_SEEDS].isObtained();
		},
		function() {
			let MARKET_GROWTH = .2;
			let sellAmount = 0;
			if (skills[BEET_MARKET].getUsableLevel() > 0) {
				sellAmount = skills[BEET_MARKET].getUsableLevel() * MARKET_GROWTH;
			}
			return sellAmount;
		}
	);

	function createBeets() {
		let centipedes = 0;
		if (events[CENTIPEDES.title].hasOccurred() && skills[PEST_CONTROL].getLevel() <= 5) {
			centipedes = (skills[PEST_CONTROL].getLevel() - 5) * .006;
		}
		return farmingBase() + centipedes;
	}

	function distanceFromTemperature(temp) {
		return (Math.abs(temp - settings[GREENHOUSE_TEMPERATURE].setting()) + 1);
	}

	function distanceFromPh(ph) {
        return (Math.abs(ph - settings[SOIL_PH].setting()) + 1);
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
		let farmingBase = skills[FARMING].getUsableLevel() * .1;
		let kFarmBonus = skills[K_FARMING].getUsableLevel() * .01;
		let edaphologyBonus = skills[EDAPHOLOGY].getUsableLevel() * .1;
		let tilledBonus = upgrades[TILLING].isObtained() ? .3 : 0;
		let alignmentBonus = SOIL_ALIGNMENT_SELECTION.indexOf(settings[SOIL_ALIGNMENT].setting()) * .1;
		let soilQualityBonus = Math.min(units[SOIL_QUALITY].amount(), 100) * .002;

		let toolBonus = _.reduce(TOOL_TYPES, (sum, type) => {
			return sum + _.reduce(TOOL_MATERIALS, (sum, material) => {
				return sum + (UpgradeUtil.getToolByString(material, type).isObtained() ? .01 : 0);
			}, 0);
		}, 0);

		let plantedCrownBonus = events[CROWN_OF_ROOTS.title].chosenPath() === CROWN_OF_ROOTS.title ? .2 : 0;

		let totalBonusMult = 1 + (toolBonus * skills[TOOLCRAFT].getLevel())+ tilledBonus + plantedCrownBonus
			+ kFarmBonus + edaphologyBonus + alignmentBonus + soilQualityBonus;

		let tillingPenalty = upgrades[TILLING].inProgress() ? 5 : 1;

		let totalPenaltyMult = tillingPenalty;

		let farmingTotal = farmingBase * totalBonusMult / totalPenaltyMult;

		return farmingTotal;
	}

	createUnit(SOIL_QUALITY,
		() => {},
		() => upgrades[PLOW_FIELD].isObtained(),
		() => 1);

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
				let curseBase = 1.1;
				let corn = units[CORN].amount() * .01;
				return curseBase * corn;
			}
			return 0;
		},
		function() {
			return units[BEETS].isDiscovered();
		}
	).setIsHidden(true);
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

		let paintBonus = upgrades[PAINT_STAND].isObtained() ? .1 : 0;
		let postersBonus = upgrades[POSTERS].isObtained() ? .1 : 0;
		let criersBonus = upgrades[BEET_CRIERS].isObtained() ? .1 : 0;

		let totalBonusMult = 1 + paintBonus * postersBonus * criersBonus;

		let GOLD_PER_BEET = .2;
		let GOLD_PER_WHITE_BEET = .4;
		let GOLD_PER_DIRE_BEET = .6;
		let GOLD_PER_SENTIENT_BEET = .8;
		let GOLD_PER_SAZE_RUNIC_BEET = 1;

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

		return beetGold * totalBonusMult;
	}

    createUnit(GOODNESS,
        function() {

        },
        function() {
            return true;
        }
    ).setIsHidden(true);

	loadUnits();

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
		return units[name];
	}
})(Units, Skills, Upgrades, Events, Settings, Generator, Spender, Discoverer, StatisticTracker, SaveManager);