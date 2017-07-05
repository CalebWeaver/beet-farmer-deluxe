let Unit = (function(){
    'use strict';

    function Unit(name) {

        let unit = this;

        unit.name = name;
        unit.amount = ko.observable(0);
        unit.isDiscovered = ko.observable(false);
        unit.remove = remove;
        unit.add = add;
        unit.isHidden = false;
        unit.amountPerSecond = ko.observable(0);
        unit.spentPerSecond = ko.observable(0);
        unit.isAvailable = ko.computed(
            function() {
                return unit.isDiscovered() && !unit.isHidden;
            }
        );

        function remove(i) {
            if (unit.amount() >= i) {
                unit.amount(unit.amount() - i);
                return true;
            }
            return false;
        }

        function add(i) {
            if (i < 0) {
                remove(i * -1);
            } else {
                unit.amount(unit.amount() + i);
            }
        }
    }

    return Unit;
})();