let SkillDescriber = (function(Skill, units, skills, upgrades, events, discoverer, save) {
	'use strict';
	let self = this;

	(function() {

		createSkill(FARMING,
			function() {
				return true;
			}
		);

        createSkill(BEET_MARKET,
            function() {
                return units[BEETS].amount() >= 50;
            }
        ).setToggleable();

        createSkill(K_FARMING,
            function() {
                return skills[FARMING].level() >= 10;
            }
        );

        createSkill(K_RELIGION,
            function() {
                return events[FARM_MONUMENT.title].hasOccurred();
            }
        );

        createSkill(TOOLCRAFT,
            function() {
                return UpgradeUtil.getTool(2,0).isObtained();
            }
        );

        createSkill(EDAPHOLOGY,
            function() {
                return skills[K_FARMING].level() >= 5;
            }
        );

        createSkill(PEST_CONTROL,
            function() {
                // return skills[FARMING].level() >= 10;
            }
        );

        createSkill(HARVESTRY,
            function() {
                return skills[FARMING].level() >= 20;
            }
        );

		createSkill(HUNTING,
			function() {
				return false;
			}
		);

		createSkill(WOODCUTTING,
			function() {
				return false;
			}
		);

		createSkill(MINING,
			function() {
				return false;
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
				return false;
			}
        ).setGroup(GUILD);

		createSkill(STRENGTH,
			function() {
				return false;
			}
		);

		createSkill(INTELLIGENCE,
			function() {
				return false;
			}
		);

		loadSkills();
	})();

	return self;

	function loadSkills() {
		if (save.load) {
			save.load.skills.forEach(function(skill) {
				skills[skill.name].setLevel(skill.level);
				skills[skill.name].isAvailable(skill.isAvailable);
			});
		}
	}

	function createSkill(name, discovery) {
		let skill = new Skill(name);
		skills[name] = skill;
		discoverer[name] = discovery;
		return skill;
	}
}(Skill, Units, Skills, Upgrades, Events, Discoverer, SaveManager));