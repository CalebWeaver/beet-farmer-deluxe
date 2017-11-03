let Event = (function() {
    'use strict';

    Event.prototype.occurs = function() {
        if (!this.hasOccurred()) {
            if (this.effect) this.effect();
            this.hasOccurred(true);
        }
    };

    Event.prototype.addPath = function(value, requirement) {
        requirement
        this.paths.push({title:value, requirement: requirement});
        return this;
    };

    Event.prototype.choosePath = function(path) {
        this.chosenPath(path);
    };

    Event.prototype.setEffect = function(effect) {
        this.effect = effect;
        return this;
    };

    return Event;

    function Event(name, description) {

        let event = this;
        event.name = name;
        event.description = description;
        event.hasOccurred = ko.observable(false);
        event.paths = [];
        event.chosenPath = ko.observable();
    }
})();