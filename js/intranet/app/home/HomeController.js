"use strict";
(
    function(){
        var dependencies = ['angular','jquery','../../display/home/HomeView'];

        define(dependencies,function(angular,$$,HomeView) {

            var HomeController = function($scope, $http, $log, $document,$rootScope,$interval){

                console.log("HomeController");

                $rootScope.title = "Home";

                $document.ready(function(e){
                    console.log("HomeController doc ready");
                    // this interval is to get rid of some angular error, that I figured had something to do with the rendering
                    // stage of angular.
                    $interval(function(){
                        new HomeView({container:".content-container"});
                    },
                    100,1);
                    //var home = new HomeView({container:".content-container"});
                });
            };

            HomeController.$inject = ['$scope','$http','$log','$document','$rootScope','$interval'];

            return HomeController;

        });


    }()
);
