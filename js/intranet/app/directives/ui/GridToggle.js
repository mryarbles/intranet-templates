/**
 * Toggles
 * jquery.toggles wrapper
 */

"use strict";
(
    function(){
        var dependencies = ['angular',"./UIModule",'toggles'];

        define(dependencies,function(angular,UIModule) {

            console.log("directives.ui.GridToggle");

            // camelCase get converted to snake-case when applied to dom element
            UIModule.directive("uiGridToggle",function($document){

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

                    element.find(".toggle-on").append('<div class="icon icon-grid"></div>');
                    element.find(".toggle-off").append('<div class="icon icon-list"></div>');

                }
            });

        });


    }()
);
