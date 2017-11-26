let SettingUtil = (function(settings) {
    "use strict";
    let settingUtil = {};
    settingUtil.getSettingIndex = getSettingIndex;
    settingUtil.getAvailableSettings = getAvailableSettings;

    return settingUtil;

    function getSettingIndex(settingName) {
        return settings[settingName].range.indexOf(settings[settingName].setting());
    }

    function getAvailableSettings() {
        return _.filter(settings, setting => setting.isAvailable());
    }
})(Settings);