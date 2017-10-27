let Spender = (function(units, stats){
    'use strict';

    let self = {};

    self.setSpending = setSpending;
    self.spendingPerSec = {};
    self.hasSpent = {};

    return self;

    function setSpending(name, decrement) {
        self[name] = function() {
            self.hasSpent[name] = false;
            let spendAmount = decrement() * stats.GENERATE_SPEED;
            if (units[name].remove(spendAmount)) {
                self.hasSpent[name] = true;
            }
            return spendAmount;
        };

        self.spendingPerSec[name] = decrement;
    }
}(Units, StatisticTracker));