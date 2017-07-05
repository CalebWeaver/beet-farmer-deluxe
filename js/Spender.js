let Spender = (function(units, stats){
    'use strict';

    let self = {};

    self.setSpending = setSpending;
    self.hasSpent = {};

    return self;

    function setSpending(name, decrement) {
        self[name] = function() {
            self.hasSpent[name] = false;
            let spendAmount = decrement() * stats.GENERATE_SPEED;
            if (units.units[name].remove(spendAmount)) {
                self.hasSpent[name] = true;
            }
            return spendAmount;
        }
    }
}(Units, StatisticTracker));