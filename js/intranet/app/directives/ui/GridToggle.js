/**
 * Toggles
 * jquery.toggles wrapper
 */

"use strict";
(
    function(){
        var dependencies = ['angular',"./UIModule",'toggles','../../services/events/ListTypeEvent'];

        define(dependencies,function(angular,UIModule,jqToggles,ListTypeEvent) {

            console.log("directives.ui.GridToggle");

            // camelCase get converted to snake-case when applied to dom element
            UIModule.directive("uiGridToggle",function($document,ListTypeEvent){

                return function(scope,element,attr){
                    console.log("GridToggle");

                    element.toggles({
                        //width:40,
                        height:30,
                        drag:false,
                        text: {
                            on:"",
                            off:""
                        }
                    });

                    // listen for toggle and emit type
                    element.on('toggle', function (e, active) {
                        var type = "";
                        if(active){
                            type = "grid";
                        } else {
                            type = "list";
                        }
                         ListTypeEvent.broadcast(type);
                    });

                    scope.$on('$destroy',function(){
                        console.log("GridToggle.destroy");
                    });

                    element.find(".toggle-on").append('<div class="icon icon-grid"></div>');
                    element.find(".toggle-off").append('<div class="icon icon-list"></div>');

                }
            });

        });


    }()
);
