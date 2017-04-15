var Setting = (function() {
    'use strict';

    return Setting;

    function Setting(name, range, defaultSet, type) {
        var setting = this;

        setting.name = name;
        setting.range = range;
        setting.type = type;
        setting.setting = ko.observable(defaultSet);
        setting.isAvailable = ko.observable(false);
    }
})();