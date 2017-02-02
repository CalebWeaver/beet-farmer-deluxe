var SettingDescriber = (function(Setting, unitsM, skillsM, upgradesM, eventsM, settingsM, discoverer, save) {

    (function() {
        var units = unitsM.units;
        var skills = skillsM.skills;
        var upgrades = upgradesM.upgrades;
        var events = eventsM.events;

        createSetting(GREENHOUSE_TEMPERATURE, [0, 120], 75, SETTING_TYPE_NUM,
            function() {
                return upgrades['GREENHOUSE_CLIMATE_CONTROL'];
            }
        );

        loadSettings();
    })();

    function loadSettings() {

        var settings = settingsM.settings;

        if (save.load) {
            save.load.settings.forEach(function(setting) {
                settings[setting.name].isAvailable(setting.isAvailable);
                settings[setting.name].setting(setting.setting);
            });
        }
    }

    function createSetting(name, range, defaultSet, type, discovery) {
        settingsM.settings[name] = new Setting(name, range, defaultSet, type);
        discoverer[name] = discovery;
    }
})(Setting, Units, Skills, Upgrades, Events, Settings, Discoverer, SaveManager);