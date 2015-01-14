/**
 * Departments.
 * Theoretically it could tie into internationationalization to set different properties for pages.
 */

"use strict";
(
    function(){
        var dependencies = ['angular',"../Services","./BaseEvent","mryarbles"];

        define(dependencies,function(angular,Services,BaseEvent,mry) {
            console.log("services.events.UsersEvent");
            var Event = function($rootScope){
                console.log("UsersEvent");
                BaseEvent.call(this,$rootScope);
                this.event = Event.USERS_LOADED;
            }

            Event.USERS_LOADED = "onUsers"

            Event.$inject = ['$rootScope'];

            mryarbles.extend(Event,BaseEvent);

            Services.service("UsersEvent", Event);

            return Event;

        });
    }()
);
