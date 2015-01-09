"use strict";
(
    function(){
        var dependencies = ['angular','jquery',"../services/PageParameters","../services/Departments"];

        define(dependencies,function(angular) {

            var DirectoryController = function($rootScope,$scope,$http,$log,$document,pageParameters,departments){

                console.log("DirectoryController");

                $rootScope.title = pageParameters.title + "People";
                $rootScope.bodyClass = "directory";
                $scope.departments = departments;

                angular.element("document").ready(function(e){

                });
            };

            DirectoryController.$inject = ['$rootScope','$scope','$http','$log','$document','PageParameters',"Departments"];

            return DirectoryController;

        });


    }()
);
