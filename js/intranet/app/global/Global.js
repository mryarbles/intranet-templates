"use strict";
(function(){
    var dependencies = ['config', 'angular', "ngRoute","./NavController"];
    define(dependencies,

        function (config,  angular, ngRoute, NavController){

            console.log("GlobalModule");

            var moduleName = config.appName + ".global",
                module = angular.module(moduleName,['ngRoute']);
                module.controller('NavController',NavController);

            return module;

        }

    );
}());
