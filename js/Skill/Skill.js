let Skill = (function(player, skills, constitution) {
    'use strict';

    Skill.prototype.getLevel = function() {
        return this.isActive() ? this.level() : 0;
    };

    function Skill(name) {

        let skill = this;
        skill.name = name;
        skill.level = ko.observable(0);
        skill.isAvailable = ko.observable(false);
        skill.toggleable = false;
        skill.isActive = ko.observable(true);
        skill.getUsableLevel = ko.computed(this.getLevel.bind(this));
        skill.levelCost = ko.computed(() => Math.floor((this.getLevel() / 10) + 1));
    }

    Skill.prototype.setGroup = function(value) {
        this.group = value;
        return this;
    };

    Skill.prototype.setLevel = function(level) {
        this.level(level);
        return this;
    };

    Skill.prototype.setToggleable = function() {
        this.toggleable = true;
        return this;
    };

    Skill.prototype.toggle = function() {
        this.isActive(!this.isActive());
    };

    Skill.prototype.add = function(levelsToAdd) {
        this.level(this.level() + levelsToAdd);
    };

    Skill.prototype.levelUp = function() {
        let levelCost = this.levelCost();
        if (player.currentLevel() >= levelCost) {
            this.level(this.level() + 1);
            player.currentLevel(player.currentLevel() - levelCost);
        } else if (player.currentLevel() < levelCost) {
            player.notEnoughLevels = true;
            console.log("Not enough levels.");
        }
    };

    return Skill;

}(Player, Skills, ConstitutionTracker));