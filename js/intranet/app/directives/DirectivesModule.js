"use strict";

define(
    function (require){
        var config = require("config"),
            angular = require("angular"),
            uiModule = require("./ui/UIModule"),
            directoryModule = require("./directory/DirectoryModule");

        console.log("directives.DirectivesModule");

        var moduleName = "directives",
            module = angular.module(moduleName,[uiModule.name,directoryModule.name]);

        require("./ui/Toggles");
        require("./ui/GridToggle");
        require("./directory/Pagination");
        require("./directory/PaginationLink");
        require("./directory/DirectoryUser");

        return module;

    }
);
