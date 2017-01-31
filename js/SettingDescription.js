var SettingDescription = (function() {
    'use strict';

    var self = {};

    self.settings = {};

    self.Setting = Setting;

    return self;

    function Setting(name, range, defaultSet, type) {
        var setting = {
            name : name,
            range : range,
            type : type,
            setting : ko.observable(defaultSet),
            isAvailable: ko.observable(true)
        };

        return setting;
    }
}());