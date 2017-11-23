let TransactionManager = (function(units) {
    "use strict";
    let self = {};
    self.isUpgradePurchasable = isUpgradePurchasable;

    return self;

    function isUpgradePurchasable(upgrade) {
        let isPurchasable = upgrade.isAvailable();

        if (upgrade.costUnit && upgrade.cost() && isPurchasable) {
            isPurchasable = units[upgrade.costUnit].amount() >= upgrade.cost();
        }

        return isPurchasable;
    }
})(Units);