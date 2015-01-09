/**
 * PageParameters is a service.
 * Theoretically it could tie into internationationalization to set different properties for pages.
 */

"use strict";
(
    function(){
        var dependencies = ['angular',"../services/Services"];

        define(dependencies,function(angular,Services) {

            Services.factory('PageParameters',['$rootScope',
                function($rootScope){
                    console.log("services.PageParameters");
                    var obj = {};
                    obj.title = "SSLA Intranet | ";
                    return obj;
                }
            ]);

        });


    }()
);
