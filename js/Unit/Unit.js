let Unit = (function(){
    'use strict';

    function Unit(name) {

        let unit = this;

        unit.name = name;
        unit.amount = ko.observable(0);
        unit.generated = 0;
        unit.isDiscovered = ko.observable(false);
        unit.isHidden = false;
        unit.amountPerSecond = ko.observable(0);
        unit.spentPerSecond = ko.observable(0);
        unit.isAvailable = ko.computed(
            function() {
                return unit.isDiscovered() && !unit.isHidden;
            }
        );
    }


    Unit.prototype.remove = function(i) {
        if (this.amount() >= i) {
            this.amount(this.amount() - i);
            return true;
        }
        return false;
    };

    Unit.prototype.add = function(i) {
        if (i < 0) {
            this.remove(i * -1);
        } else {
            this.amount(this.amount() + i);
            this.generated += i;
        }
    };

    Unit.prototype.setIsHidden = function(isHidden) {
        this.isHidden = isHidden;
        return this;
    };

    return Unit;
})();