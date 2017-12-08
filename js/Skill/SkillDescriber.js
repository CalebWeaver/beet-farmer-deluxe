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
                return UpgradeUtil.getTool(2,0).isObtained()
					&& skills[K_FARMING] >= 10;
            }
        );

        createSkill(EDAPHOLOGY,
            function() {
                return skills[K_FARMING].level() >= 20;
            }
        );

        createSkill(PEST_CONTROL,
            function() {
                return skills[K_FARMING].level() >= 40
                    && events[CENTIPEDES].hasOccurred();
            }
        );

        createSkill(HARVESTRY,
            function() {
                return skills[K_FARMING].level() >= 60;
            }
        );

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