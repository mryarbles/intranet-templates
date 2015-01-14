"use strict";
(function(){
    var dependencies = ['config', 'angular', "ngRoute","./DirectoryController","./DirectorySearchController","./DirectorySearchResultsController","./NextPreviousController"];
    define(dependencies,

        function (config,  angular, ngRoute, DirectoryController, DirectorySearchController, DirectorySearchResultsController, NextPreviousController){

            console.log("DirectoryModule");

            var moduleName = config.appName + ".directory",
                module = angular.module(moduleName,['ngRoute']);
                module.controller('DirectoryController',DirectoryController);
                module.controller('DirectorySearchController',DirectorySearchController);
                module.controller('DirectorySearchResultsController',DirectorySearchResultsController);
                module.controller('NextPreviousController',NextPreviousController);

            return module;

        }

    );
}());
