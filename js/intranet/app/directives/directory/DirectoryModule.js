"use strict";

    define(
        function (require){
            var config = require("config"),
                angular = require("angular");

            console.log("directives.DirectoryModule");

            var moduleName = "directives.directory",
                module = angular.module(moduleName,[]);

            return module;
        }
    );

