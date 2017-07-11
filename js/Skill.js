let Skill = (function(player, skills) {
    'use strict';

    return Skill;

    function Skill(name) {

        let skill = this;
        skill.name = name;
        skill.level = ko.observable(0);
        skill.setLevel = setLevel;
        skill.levelUp = levelUp;
        skill.isAvailable = ko.observable(false);
        skill.toggleable = false;
        skill.isActive = ko.observable(true);
        skill.getUsableLevel = ko.computed(getLevel);
        skill.toggle = toggle;
        skill.setGroup = setGroup;
        skill.setToggleable = setToggleable;

        function toggle() {
            skill.isActive(!skill.isActive());
        }

        function getLevel() {
            return skill.isActive() ? skill.level() : 0;
        }

        function setLevel(level) {
            skill.level(level);
            return skill;
        }

        function setGroup(value) {
            skill.group = value;
            return skill;
        }

        function setToggleable() {
            skill.toggleable = true;
            return skill;
        }

        function levelUp() {
            if (player.currentLevel() >= 1) {
                skill.level(skill.level() + 1);
                player.currentLevel(player.currentLevel() - 1);
            } else {
                console.log("Not enough levels.");
            }
        }
    }
}(Player, Skills));