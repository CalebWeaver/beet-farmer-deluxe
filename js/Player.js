var Player = (function(save) {
	'use strict';

	var self = {};

	self.xp = 0;
	self.currentLevel = ko.observable(1);
	self.totalLevel = ko.observable(1);
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
		self.xp += xp;
		checkGainLevel();
	}

	function checkGainLevel() {
		//Gaining base 100xp/sec
		var xpForLevel = (self.totalLevel() + 1) + 300;
		if (self.xp >= xpForLevel) {
			self.xp -= xpForLevel;
			self.currentLevel(self.currentLevel() + 1);
			self.totalLevel(self.totalLevel() + 1);
		}
	}
}(SaveManager));