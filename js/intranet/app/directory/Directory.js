"use strict";
(function(){
    var dependencies = ['config', 'angular', "ngRoute","./DirectoryController"];
    define(dependencies,

        function (config,  angular, ngRoute, DirectoryController){

            console.log("DirectoryModule");

            var moduleName = config.appName + ".directory",
                module = angular.module(moduleName,['ngRoute']);
                module.controller('DirectoryController',DirectoryController);

            return module;

        }

    );
}());
