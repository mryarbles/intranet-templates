"use strict";
(
    function(){
        var dependencies = ['angular'];

        define(dependencies,function(angular) {

            var Controller = function($scope,$location,$rootScope){

                $rootScope.$on('onUsers',function(event,data){
                    console.log("NextPreviousController.onUsers");
                    $scope.page = parseInt(data.search.page) + 1;
                    $scope.pages = parseInt(data.search.pages);
                });

                $scope.nextPage = function(){
                    console.log("NextPreviousController.nextPage");
                    $scope.$emit('onNextPage');
                }

                $scope.previousPage = function(){
                    $scope.$emit('onPreviousPage');
                }

            }
            Controller.$inject = ['$scope','$location',"$rootScope"];


            return Controller;

        });


    }()
);
