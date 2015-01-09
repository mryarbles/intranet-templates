"use strict";
(
    function(){
        var dependencies = ['angular'];

        define(dependencies,function(angular) {

            var Controller = function($scope,$document){

                console.log("NavController");

                angular.element("document").ready(function(e){
                    console.log("NavController doc ready");
                });
            };

            Controller.$inject = ['$scope','$http','$log','$document'];

            return Controller;

        });


    }()
);
