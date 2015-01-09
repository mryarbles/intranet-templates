"use strict";

    define(
        function (require){
            var config = require("config"),
                angular = require("angular");

            console.log("directives.UIModule");

            var moduleName = "directives.ui",
                module = angular.module(moduleName,[]);

            return module;
        }
    );

