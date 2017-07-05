let SkillDescriber = (function(Skill, unitsM, skillsM, upgradesM, eventsM, discoverer, save) {
	'use strict';
	let self = this;

	(function() {

		let units = unitsM.units;
		let skills = skillsM.skills;
		let upgrades = upgradesM.upgrades;
		let events = eventsM.events;

		createSkill(FARMING,
			function() {
				return true;
			}
		);

		createSkill(K_FARMING,
			function() {
				let intMin = 3;
				return skills[INTELLIGENCE].level() >= intMin;
			}
		);

		createSkill(TERRAMANCY,
			function() {
				let intMin = 20;
				return skills[INTELLIGENCE].level() >= intMin;
			}
		);

		createSkill(BEET_MARKET,
			function() {
				return units[BEETS].amount() > 10;
			}
		).setToggleable();

		createSkill(PEST_CONTROL,
			function() {
				return events[CENTIPEDES].hasOccurred();
			}
		);

		createSkill(HUNTING,
			function() {
				// let farmMin = 10;
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
				let stoneMin = 100;
				let woodMin = 100;
				let intMin = 10;
				return units[STONE].amount() >= stoneMin
					&& units[WOOD].amount() >= woodMin
					&& skills[INTELLIGENCE].level() >= intMin;
			}
		);

		createSkill(CRAFTING_G,
			function() {
				let craftingMin = 10;
				return skills[CRAFTING].level() >= craftingMin;
			}
		).setGroup(GUILD);

		createSkill(GOVERN,
			function() {
				let prestigeMin = 100;
				return units[PRESTIGE].amount() >= prestigeMin;
			}
        ).setGroup(GUILD);

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
		let skills = skillsM.skills;
		if (save.load) {
			save.load.skills.forEach(function(skill) {
				skills[skill.name].setLevel(skill.level);
				skills[skill.name].isAvailable(skill.isAvailable);
			});
		}
	}

	function createSkill(name, discovery) {
		let skill = new Skill(name);
		skillsM.skills[name] = skill;
		discoverer[name] = discovery;
		return skill;
	}
}(Skill, Units, Skills, Upgrades, Events, Discoverer, SaveManager));