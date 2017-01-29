var SaveManager = (function() {
	'use strict';

	var self = {};

	self.load = load();
	self.save = save;

	return self;

	function load() {
		//#PROD
		// var cookie = document.cookie;
		// if (cookie) {
		// 	var parsed = JSON.parse(cookie);
		// }
		// return parsed;
		return ;
	}

	function save(game) {
		document.cookie = JSON.stringify(ko.toJS(game));
	};
})();