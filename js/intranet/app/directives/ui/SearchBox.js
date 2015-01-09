/**
 * SearchBox
 */

"use strict";
(
    function(){
        var dependencies = ['angular',"./UIModule",'toggles'];

        define(dependencies,function(angular,UIModule) {

            console.log("directives.ui.Toggles");

            // camelCase get converted to snake-case when applied to dom element
            UIModule.directive("uiSearchBox",function($document){

                return function(scope,element,attr){
                    console.log("SearchBox");

                }
            });

        });


    }()
);
