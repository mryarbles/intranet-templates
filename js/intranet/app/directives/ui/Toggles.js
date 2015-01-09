/**
 * Toggles
 * jquery.toggles wrapper
 */

"use strict";
(
    function(){
        var dependencies = ['angular',"./UIModule",'toggles'];

        define(dependencies,function(angular,UIModule) {

            console.log("directives.ui.Toggles");

            // camelCase get converted to snake-case when applied to dom element
            UIModule.directive("uiToggles",function($document){

                return function(scope,element,attr){
                    console.log("Toggles");

                    element.toggles({
                        //width:40,
                        height:30,
                        drag:false,
                        text: {
                            on:"",
                            off:""
                        }
                    });


                }
            });

        });


    }()
);
