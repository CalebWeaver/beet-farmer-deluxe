let Logger = (function(stats, player, units) {

    let self = {};

    self.checkLog = checkLog;
    let logIndex = 0;
    return self;

    function checkLog() {
        if ((stats.totalTimePlayed() >= 0 && logIndex == 0) ||
            (stats.totalTimePlayed() >= 60 && logIndex == 1) ||
            (stats.totalTimePlayed() >= 300 && logIndex == 2) ||
            (stats.totalTimePlayed() >= 1800 && logIndex == 3) ||
            (stats.totalTimePlayed() >= 3600 && logIndex == 4) ||
            (stats.totalTimePlayed() >= 7200 && logIndex == 5) ||
            (stats.totalTimePlayed() >= 21600 && logIndex == 6)) {
            console.log('Time: '+stats.totalTimePlayed()+' Level: '+player.totalLevel()+' Beets: '+units[BEETS].generated+' Bps: '+units[BEETS].amountPerSecond());
            logIndex++;
        }
    }
})(StatisticTracker, Player, Units);