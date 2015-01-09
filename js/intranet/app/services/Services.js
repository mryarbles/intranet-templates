"use strict";
(function(){
    var dependencies = ['config', 'angular'];
    define(dependencies,

        function (config,  angular){

            var moduleName = config.appName + ".services",
                module = angular.module(moduleName,[]);


            return module;

        }

    );
}());
