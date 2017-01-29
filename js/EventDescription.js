var EventDescription = (function() {
	'use strict';

	var self = {};

	self.events = {};

	self.Event = Event;

	return self;

	function Event(name, description, effect) {

		var event = {
			name: name,
			description: description,
			occurs: occurs,
			hasOccurred: ko.observable(false),
			paths: [],
			chosenPath: ''
		};

		return event;

		function occurs() {
			if (!event.hasOccurred()) {
				effect();
				event.hasOccurred(true);
			}
		}
	}
}());