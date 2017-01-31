SettingDescriber = (function(unitsM, skillsM, upgradesM, eventsM, settingsM, discoverer, save) {

    (function() {
        var units = unitsM.units;
        var skills = skillsM.skills;
        var upgrades = upgradesM.upgrades;
        var events = eventsM.events;

        createSetting(GREENHOUSE_TEMPERATURE,
        function() {
            return true;
        },
        [0, 120],
        75,
        SETTING_TYPE_NUM);

    })();

    function createSetting(name, discovery, range, defaultSet, type) {
        settingsM.settings[name] = settingsM.Setting(name, range, defaultSet, type);
        discoverer[name] = discovery;
    }
})(UnitDescription, SkillDescription, UpgradeDescription, EventDescription, SettingDescription, Discoverer, SaveManager);