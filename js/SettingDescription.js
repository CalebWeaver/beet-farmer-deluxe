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
        return _.filter(self.settings, setting => setting.isAvailable());
    }
})();