"use strict";
(
    function(){
        var dependencies = ['angular','ngRoute'];

        define(dependencies,function(angular,ngRoute) {

            var TestController = function($scope,$document){

                console.log("TestController");

                $document.ready(function(e){
                    alert("TestController doc ready");
                });
            };

            TestController.$inject = ['$scope','$http','$log'];

            return TestController;

        });


    }()
);
