/**
 * Departments.
 * Theoretically it could tie into internationationalization to set different properties for pages.
 */

"use strict";
(
    function(){
        var dependencies = ['angular',"../Services"];

        define(dependencies,function(angular,Services) {
            console.log("services.events.BaseEvent");

            var Event = function($rootScope){
                console.log(Event);
                this.event = "onEvent";
                this.dispatcher = $rootScope;
            }

            Event.prototype.broadcast = function(data){
                this.dispatcher.$broadcast(this.event,data);
            }

            Event.prototype.listen = function(callback){
                this.offFunc = this.dispatcher.$on(this.event,callback);
            }

            Event.prototype.off = function(){
                this.offFunc();
                delete this.offFunc;
            }

            Event.$inject = ['$rootScope'];

            Services.service("BaseEvent",Event);

            return Event;

        });


    }()
);
