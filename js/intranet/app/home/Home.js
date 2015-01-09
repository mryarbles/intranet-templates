"use strict";
(function(){
    var dependencies = ['config', 'angular', "ngRoute","./HomeController"];
    define(dependencies,

        function (config,  angular, ngRoute, HomeController){

            console.log("HomeModule");

            var homeModuleName = config.appName + ".home",
                homeModule = angular.module(homeModuleName,['ngRoute']);
                homeModule.controller('HomeController',HomeController);

            return homeModule;

        }

    );
}());
