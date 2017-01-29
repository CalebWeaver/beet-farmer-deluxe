var UnitDescription = (function(){
	'use strict';

	var self = {};

	self.units = {};
	self.Unit = Unit;

	return self;

	function Unit(name) {

		var unit = {
			name: name,
			amount: ko.observable(0),
			isDiscovered: ko.observable(false),
			remove: remove,
			add: add,
			isHidden: false,
			amountPerSecond: ko.observable()
		};

		unit.isAvailable = ko.computed(
			function() {
				return unit.isDiscovered() && !unit.isHidden;
			}
		);

		return unit;

		function remove(i) {
			if (unit.amount() >= i) {
				unit.amount(unit.amount() - i);
			}
		}

		function add(i) {
			if (i < 0) {
				remove(i * -1);
			} else {
				unit.amount(unit.amount() + i);
			}
		}s
	}
}());