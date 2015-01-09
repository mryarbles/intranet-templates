"use strict";

define(
    function (require){
        var config = require("config"),
            angular = require("angular"),
            uiModule = require("./ui/UIModule");

        console.log("directives.DirectivesModule");

        var moduleName = "directives",
            module = angular.module(moduleName,[uiModule.name]);

        require("./ui/Toggles");
        require("./ui/GridToggle");

        return module;

    }
);
