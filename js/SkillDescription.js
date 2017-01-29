var SkillDescription = (function(player) {
	'use strict';

	var self = {};

	self.skills = {};
	self.guilds = [];

	self.Skill = Skill;

	return self;

	function Skill(name, subtype, toggleable) {
		var skill = {
			name: name,
			level: ko.observable(0),
			setLevel: setLevel,
			incrementLevel: incrementLevel,
			isAvailable: ko.observable(false),
			toggleable: ko.observable(toggleable), //TODO: Does this need to be obsv?
			isActive: ko.observable(true)
		};

		skill.getLevel = ko.computed(getLevel);
		skill.toggleDisplay = ko.computed(function() {
			return ''
		});
		skill.toggle = toggle;

		if (subtype === GUILD) {
			self.guilds.push(skill);
		}

		return skill;

		function toggle() {
			skill.isActive(!skill.isActive());
		}

		function getLevel() {
			return skill.isActive() ? skill.level() : 0;
		}

		function setLevel(level) {
			skill.level(level);
		}

		function incrementLevel() {
			if (player.currentLevel() >= 1) {
				skill.level(skill.level() + 1);
				player.currentLevel(player.currentLevel() - 1);
			} else {
				console.log("Not enough levels.");
			}
		}
	}
}(Player));