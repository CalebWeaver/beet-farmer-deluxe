let Player = (function(save) {
	'use strict';

	let self = {};

	self.xp = 30;
	self.currentLevel = ko.observable(1);
	self.totalLevel = ko.observable(1);
	self.xpForLevel = ko.computed(() => 200);
	self.notEnoughLevels = false;
	self.constitution = 1;
	self.gainXp = gainXp;

	(function() {
		loadPlayer();
	})();

	return self;

	function loadPlayer() {
		if (save.load) {
			self.xp = save.load.player.xp;
			self.currentLevel(save.load.player.currentLevel);
			self.totalLevel(save.load.player.totalLevel);
		}
	}

	function gainXp(xp) {
		if (!xp) {
			xp = .1;
		}
		self.xp += xp;
		checkGainLevel();
	}

	function checkGainLevel() {
		if (self.xp >= self.xpForLevel()) {
			self.notEnoughLevels = false;
			self.xp -= self.xpForLevel();
			self.currentLevel(self.currentLevel() + 1);
			self.totalLevel(self.totalLevel() + 1);
		}
	}
}(SaveManager));