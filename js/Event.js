let Event = (function() {
    'use strict';

    return Event;

    function Event(name, description) {

        let event = this;
        event.name = name;
        event.description = description;
        event.occurs = occurs;
        event.hasOccurred = ko.observable(false);
        event.paths = [];
        event.addPath = addPath;
        event.chosenPath = ko.observable();
        event.choosePath = choosePath;
        event.setEffect = setEffect;

        function occurs() {
            if (!event.hasOccurred()) {
                if (event.effect) event.effect();
                event.hasOccurred(true);
            }
        }

        function addPath(value) {
            event.paths.push(value);
            return event;
        }

        function choosePath(path) {
            event.chosenPath(path);
        }

        function setEffect(effect) {
            event.effect = effect;
            return event;
        }
    }
})();