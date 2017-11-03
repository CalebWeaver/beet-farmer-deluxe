let SettingDescriber = (function(Setting, units, skills, upgrades, events, settings, discoverer, save) {

    (function() {
        createSetting(GREENHOUSE_TEMPERATURE, [0, 120], 75, SETTING_TYPE_NUM,
            function() {
                return upgrades[GREENHOUSE].isObtained();
            }
        );

        createSetting(SOIL_PH, [0, 14], 7, SETTING_TYPE_NUM,
            function() {
                return skills[EDAPHOLOGY].level() >= 10;
            }
        );

        createSetting(BREED_BEETS, [0, 100], 0, SETTING_TYPE_NUM,
            function() {
                return events[GAINING_KNOWLEDGE.title].chosenPath() == GAINING_KNOWLEDGE.paths[1];
            }
        );

        createSetting(SPLICE_BEETS, [0, 100], 0, SETTING_TYPE_NUM,
            function() {
                return events[GAINING_KNOWLEDGE.title].chosenPath() == GAINING_KNOWLEDGE.paths[0];
            }
        );

        createSetting(HARVEST_TECHNIQUE, HARVEST_TECHNIQUE_SELECTION, HARVEST_TECHNIQUE_SELECTION[0], SETTING_TYPE_SEL,
            function() {
                return skills[HARVESTRY].level() >= 10;
            }
        );

        createSetting(HARVEST_TECHNIQUE, HARVEST_TECHNIQUE_SELECTION, HARVEST_TECHNIQUE_SELECTION[0], SETTING_TYPE_SEL,
            function() {
                return skills[HARVESTRY].level() >= 10;
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