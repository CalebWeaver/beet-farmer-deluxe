var Skill = (function(player, skills) {
    'use strict';

    return Skill;

    function Skill(name) {

        var skill = this;
        skill.name = name;
        skill.level = ko.observable(0);
        skill.setLevel = setLevel;
        skill.incrementLevel = incrementLevel;
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
            if (!skills[value]) {
                skills[value] = [];
            }
            skills[value].push(skill);
            return skill;
        }

        function setToggleable() {
            skill.toggleable = true;
            return skill;
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
}(Player, Skills));