var StatisticTracker = (function(save) {
	'use strict';

	var UPDATE_TICK = 10;

	var TICK_PER_SECOND = (1000 / UPDATE_TICK);
	var TICK_PER_MINUTE = TICK_PER_SECOND * 60;
	var TICK_PER_HOUR = TICK_PER_MINUTE * 60;
	var TICK_PER_DAY = TICK_PER_HOUR * 24;
	var TICK_PER_WEEK = TICK_PER_DAY * 7;
	var TICK_PER_TWO_WEEK = TICK_PER_WEEK * 2;

	var BASE_CHANCE = TICK_PER_TWO_WEEK;

	var SECOND_CHANCE = (1 / TICK_PER_SECOND) * BASE_CHANCE;
	var MINUTE_CHANCE = (1 / TICK_PER_MINUTE) * BASE_CHANCE;
	var HOUR_CHANCE = (1 / TICK_PER_HOUR) * BASE_CHANCE;
	var DAY_CHANCE = (1 / TICK_PER_DAY) * BASE_CHANCE;
	var WEEK_CHANCE = (1 / TICK_PER_WEEK) * BASE_CHANCE;
	var TWO_WEEK_CHANCE = (1 / TICK_PER_TWO_WEEK) * BASE_CHANCE;

	var startObservedTime = new Date();
	var loadedTimePlayed = 0;

	var self = {};

	self.UPDATE_TICK = UPDATE_TICK;
	self.SECOND_CHANCE = SECOND_CHANCE;
	self.MINUTE_CHANCE = MINUTE_CHANCE;
	self.HOUR_CHANCE = HOUR_CHANCE;
	self.DAY_CHANCE = DAY_CHANCE;
	self.WEEK_CHANCE = WEEK_CHANCE;
	self.TWO_WEEK_CHANCE = TWO_WEEK_CHANCE;
	self.totalObservedTime = 0;
	self.randomEvent = 0;
	self.sessionOpenTime = new Date().getTime();
	self.totalTimePlayed = ko.observable();

	self.hours = ko.computed(function() {
		return Math.floor(self.totalTimePlayed() / 3600);
	});
	self.min = ko.computed(function() {
		return Math.floor((self.totalTimePlayed() % 3600) / 60);
	});
	self.sec = ko.computed(function() {
		return ((self.totalTimePlayed() % 3600) % 60).toFixed(0);
	});

	self.changeRandomEvent = changeRandomEvent;
	self.findChance = findChance;
	self.updateTimePlayed = updateTimePlayed;

	(function() {
		$(window).focus(function() {
			startObservedTime = new Date();
		});

		$(window).blur(function() {
			self.totalObservedTime += (new Date() - startObservedTime);
		});

		loadStats();
	})();

	return self;

	function changeRandomEvent() {
		self.randomEvent = math.randomInt(BASE_CHANCE);
	}

	// chance = SECOND_CHANCE / 10 will hit every ~10 sec
	function findChance(chance) {
		return self.randomEvent <= chance;
	}

	function updateTimePlayed() {
		self.totalTimePlayed(loadedTimePlayed + (new Date().getTime() - self.sessionOpenTime) / 1000);
	}

	function loadStats() {
		if (save.load) {
			loadedTimePlayed = save.load.timePlayed;
		}
	}
})(SaveManager);