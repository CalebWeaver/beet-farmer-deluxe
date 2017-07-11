let SettingDescriber = (function(Setting, units, skills, upgrades, events, settings, discoverer, save) {

    (function() {
        createSetting(GREENHOUSE_TEMPERATURE, [0, 120], 75, SETTING_TYPE_NUM,
            function() {
                return upgrades[GREENHOUSE].isObtained();
            }
        );

        loadSettings();
    })();

    function loadSettings() {

        if (save.load) {
            save.load.settings.forEach(function(setting) {
                settings[setting.name].isAvailable(setting.isAvailable);
                settings[setting.name].setting(setting.setting);
            });
        }
    }

    function createSetting(name, range, defaultSet, type, discovery) {
        settings[name] = new Setting(name, range, defaultSet, type);
        discoverer[name] = discovery;
    }
})(Setting, Units, Skills, Upgrades, Events, Settings, Discoverer, SaveManager);