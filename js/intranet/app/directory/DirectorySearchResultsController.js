"use strict";
(
    function(){
        var dependencies = ['angular',"../services/events/ListTypeEvent","../services/events/UsersEvent"];

        define(dependencies,function(angular,ListTypeEvent,UsersEvent) {

            var Controller = function($rootScope,$scope,$log,ListTypeEvent,UsersEvent){
                $log.log("DirectorySearchResultsController");

                $scope.listType = "list";
                $scope.users = [];

                $scope.render = function(data){
                    $log.log("DirectorySearchResultsController.render");


                    var users = data.result;

                    if(users !== null){

                        //for(var index=0,length = users.length; index <length; index++){

                          //  var user = users[index];

                        //}
                    } else {
                        console.log("No users were returned.");
                    }

                    $scope.users = data.result;

                }


                UsersEvent.listen(function(event,data){
                    $log.log("DirectorySearchResultsController.onUsers");
                    $log.info(data);
                    $scope.render(data);
                });


                ListTypeEvent.listen(function(event,data){
                    $log.log("DirectorySearchResultsController.onListType");
                    $scope.listType = data;
                    $rootScope.$digest();

                });


            };

            Controller.$inject = ['$rootScope','$scope',"$log",'ListTypeEvent','UsersEvent'];

            return Controller;

        });


    }()
);
