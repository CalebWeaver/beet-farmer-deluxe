var Unit = (function(){
    'use strict';

    function Unit(name) {

        var unit = this;

        unit.name = name;
        unit.amount = ko.observable(0);
        unit.isDiscovered = ko.observable(false);
        unit.remove = remove;
        unit.add = add;
        unit.isHidden = false;
        unit.amountPerSecond = ko.observable();
        unit.isAvailable = ko.computed(
            function() {
                return unit.isDiscovered() && !unit.isHidden;
            }
        );

        function remove(i) {
            if (unit.amount() >= i) {
                unit.amount(unit.amount() - i);
            }
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