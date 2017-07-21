let Settings = (function() {
    'use strict';
    return {};
}());

let SettingUtil = (function() {

    'use strict';

    let self = {};

    self.getAvailableSettings = getAvailableSettings;

    return self;

    function getAvailableSettings() {
        return _.filter(Settings, setting => setting.isAvailable());
    }
})();