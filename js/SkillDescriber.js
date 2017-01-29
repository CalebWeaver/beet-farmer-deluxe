var SkillDescriber = (function(unitsM, skillsM, upgradesM, eventsM, discoverer, save) {
	'use strict';
	self = this;

	(function() {

		var units = unitsM.units;
		var skills = skillsM.skills;
		var upgrades = upgradesM.upgrades;
		var events = eventsM.events;

		createSkill(FARMING,
			function() {
				return true;
			}
		);

		createSkill(K_FARMING,
			function() {
				var intMin = 3;
				return skills[INTELLIGENCE].level() >= intMin;
			}
		);

		createSkill(TERRAMANCY,
			function() {
				var intMin = 20;
				return skills[INTELLIGENCE].level() >= intMin;
			}
		);

		createSkill(BEET_MARKET,
			function() {
				return units[BEETS].amount() > 100;
			}
		);
		setToggleable(BEET_MARKET);

		createSkill(PEST_CONTROL,
			function() {
				return events[CENTIPEDES].hasOccurred();
			}
		);

		createSkill(HUNTING,
			function() {
				// var farmMin = 10;
				// return skills[FARMING].level() >= farmMin;
			}
		);

		createSkill(WOODCUTTING,
			function() {
				return upgrades[AXE].isObtained();
			}
		);

		createSkill(MINING,
			function() {
				return upgrades[PICK].isObtained();
			}
		);

		createSkill(FISHING,
			function() {
				return upgrades[FISHING_POLE].isObtained();
			}
		);

		createSkill(CRAFTING,
			function() {
				var stoneMin = 100;
				var woodMin = 100;
				var intMin = 10;
				return units[STONE].amount() >= stoneMin
					&& units[WOOD].amount() >= woodMin
					&& skills[INTELLIGENCE].level() >= intMin;
			}
		);

		createSkill(CRAFTING_G,
			function() {
				var craftingMin = 10;
				return skills[CRAFTING].level() >= craftingMin;
			},
			GUILD
		);

		createSkill(GOVERN,
			function() {
				var prestigeMin = 100;
				return units[PRESTIGE].amount() >= prestigeMin;
			},
			GUILD
		);

		createSkill(STRENGTH,
			function() {
				return events[SELF_AWARENESS].hasOccurred();
			}
		);

		createSkill(INTELLIGENCE,
			function() {
				return events[SELF_AWARENESS].hasOccurred();
			}
		);

		loadSkills();
	})();

	return self;

	function loadSkills() {
		var skills = skillsM.skills;
		if (save.load) {
			save.load.skills.forEach(function(skill) {
				skills[skill.name].setLevel(skill.level);
				skills[skill.name].isAvailable(skill.isAvailable);
			});
		}
	}

	function createSkill(name, discovery, subtype) {
		skillsM.skills[name] = skillsM.Skill(name, subtype);
		discoverer[name] = discovery;
	}

	function setToggleable(name) {
		if (!skillsM.skills[name].toggleable) {
			skillsM.skills[name].toggleable = true;
		} else {
			skillsM.skills[name].toggleable = false;
		}
	}
}(UnitDescription, SkillDescription, UpgradeDescription, EventDescription, Discoverer, SaveManager));