var UpgradeDescription = (function() {
	'use strict';

	var self = {};

	self.upgrades = {};
	self.Upgrade = Upgrade;

	return self;

	function Upgrade(name, time, effect) {
		var upgrade = {
			name: name,
			begin: begin,
			time: time,
			inProgress: ko.observable(false),
			isDiscovered: ko.observable(false),
			isObtained: ko.observable(false)
		};

		upgrade.isAvailable = ko.computed(isAvailable);

		return upgrade;

		function begin() {

			animateButton();

			upgrade.inProgress(true);
			return new Promise(function() {
				setTimeout(function() {
					upgrade.isObtained(true);
					upgrade.inProgress(false);
				}, time);
			});
		}

		function animateButton() {
			var buttonTarget = $(event.currentTarget);
			buttonTarget.addClass("in-progress");
			buttonTarget.children().first().css({"transition-duration": (time/1000)+"s", "width": "100%"});
		}

		function isAvailable() {
			return upgrade.isDiscovered() && !upgrade.isObtained();
		}
	}
}());