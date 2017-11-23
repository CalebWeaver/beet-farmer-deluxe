let TransactionManager = (function(units) {
    "use strict";
    let self = {};
    self.isUpgradePurchasable = isUpgradePurchasable;
    self.buyUpgrade = buyUpgrade;

    return self;

    function isUpgradePurchasable(upgrade) {
        let isPurchasable = upgrade.isAvailable();

        if (upgrade.costUnit && upgrade.cost() && isPurchasable) {
            isPurchasable = units[upgrade.costUnit].amount() >= upgrade.cost();
        }

        return isPurchasable;
    }

    function buyUpgrade(upgrade) {
        if (!upgrade.inProgress()) {
            let button = event ? $(event.currentTarget) : null;
            animateButton(upgrade, button);
            upgrade.begin().then(() => {
                if (upgrade.canBuyAgain) {
                    removeProgress(button);
                }
            });
            if (upgrade.costUnit && upgrade.cost()) {
                units[upgrade.costUnit].remove(upgrade.cost());
            }
        }
    }

    function animateButton(upgrade, button) {
        if (button) {
            button.addClass("in-progress");
            button.children().first().css({"transition-duration": (upgrade.time/1000)+"s", "width": "100%"});
        }
    }

    function removeProgress(button) {
        if (button) {
            button.children().first().css({"transition-duration":"0s", "width": "0"});
        }
    }
})(Units);