/**
 * Departments.
 * Theoretically it could tie into internationationalization to set different properties for pages.
 */

"use strict";
(
    function(){
        var dependencies = ['angular',"../Services","./BaseEvent","mryarbles"];

        define(dependencies,function(angular,Services,BaseEvent,mry) {
            console.log("services.events.ListTypeEvent");

            var Event = function($rootScope){
                console.log("ListTypeEvent");
                BaseEvent.call(this,$rootScope);
                this.event = "onListTypeChange";
            }

            Event.$inject = ['$rootScope'];

            mryarbles.extend(Event,BaseEvent);

            Services.service("ListTypeEvent", Event);

            return Event;

        });
    }()
);
