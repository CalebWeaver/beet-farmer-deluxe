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

    Skill.prototype.levelUp = function() {
        // if (player.currentLevel() >= 1 && constitution.checkUseConstitution()) {
        if (player.currentLevel() >= 1) {
            this.level(this.level() + 1);
            player.currentLevel(player.currentLevel() - 1);
        } else if (player.currentLevel() <= 0) {
            player.notEnoughLevels = true;
            console.log("Not enough levels.");
            // } else {
            //     ConstitutionTracker.notEnoughLevels = true;
            //     console.log("Not enough constitution. Try eating some beets");
        }
    };

    return Skill;

}(Player, Skills, ConstitutionTracker));