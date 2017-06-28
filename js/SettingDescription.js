var Settings = (function() {
    'use strict';

    var self = {};

    self.settings = {};
    self.getAvailableSettings = getAvailableSettings;

    return self;

    function getAvailableSettings() {
        return _.filter(self.settings, setting => setting.isAvailable());
    }
}());