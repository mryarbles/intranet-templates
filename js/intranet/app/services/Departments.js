/**
 * Departments.
 * Theoretically it could tie into internationationalization to set different properties for pages.
 */

"use strict";
(
    function(){
        var dependencies = ['angular',"../services/Services"];

        define(dependencies,function(angular,Services) {

            Services.factory('Departments',['$rootScope',
                function($rootScope){
                    console.log("services.Departments");
                    var obj = [
                        { id:"10", dept:"3D" },
                        { id:"7", dept:"Account Management" },
                        { id:"24", dept:"AV" },
                        { id:"25", dept:"Brand Integration" },
                        { id:"26", dept:"Broadcast Traffic" },
                        { id:"29", dept:"Toyota" }
                    ];

                    return obj;
                }
            ]);

        });


    }()
);
