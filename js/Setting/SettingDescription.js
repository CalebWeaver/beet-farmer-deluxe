let Settings = (function() {
    'use strict';
    return {};
}());

let SettingUtil = (function(settings) {

    'use strict';

    let self = {};

    self.getAvailableSettings = getAvailableSettings;

    return self;

    function getAvailableSettings() {
        return _.filter(settings, setting => setting.isAvailable());
    }
})(Settings);