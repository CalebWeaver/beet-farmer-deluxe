var Event = (function() {
    'use strict';

    return Event;

    function Event(name, description, effect) {

        var event = this;
        event.name = name;
        event.description = description;
        event.occurs = occurs;
        event.hasOccurred = ko.observable(false);
        event.paths = [];
        event.addPath = addPath;
        event.chosenPath = ko.observable();
        event.setPath = setPath;

        function occurs() {
            if (!event.hasOccurred()) {
                effect();
                event.hasOccurred(true);
            }
        }

        function addPath(value) {
            event.paths.push(value);
            return event;
        }

        function setPath(path) {
            event.chosenPath(path);
        }
    }
})();