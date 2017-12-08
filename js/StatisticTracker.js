let StatisticTracker = (function(save) {
	'use strict';

    let GENERATE_SPEED = .01; //GENERATE_SPEED * Ticks per second = generates / second (.01 * 100 = 1)
	let UPDATE_TICK = 10; //10 = 100 Ticks per second

	let TICK_PER_SECOND = (1000 / UPDATE_TICK);
	let TICK_PER_MINUTE = TICK_PER_SECOND * 60;
	let TICK_PER_HOUR = TICK_PER_MINUTE * 60;
	let TICK_PER_DAY = TICK_PER_HOUR * 24;
	let TICK_PER_WEEK = TICK_PER_DAY * 7;
	let TICK_PER_TWO_WEEK = TICK_PER_WEEK * 2;

	let BASE_CHANCE = TICK_PER_TWO_WEEK;

	let SECOND_CHANCE = (1 / TICK_PER_SECOND) * BASE_CHANCE;
	let MINUTE_CHANCE = (1 / TICK_PER_MINUTE) * BASE_CHANCE;
	let HOUR_CHANCE = (1 / TICK_PER_HOUR) * BASE_CHANCE;
	let DAY_CHANCE = (1 / TICK_PER_DAY) * BASE_CHANCE;
	let WEEK_CHANCE = (1 / TICK_PER_WEEK) * BASE_CHANCE;
	let TWO_WEEK_CHANCE = (1 / TICK_PER_TWO_WEEK) * BASE_CHANCE;

	let startObservedTime = new Date();
	let loadedTimePlayed = 0;

	let self = {};

    self.GENERATE_SPEED = GENERATE_SPEED;
    self.UPDATE_TICK = UPDATE_TICK;
	self.TICK_PER_SECOND = TICK_PER_SECOND;
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
        changeRandomEvent();
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