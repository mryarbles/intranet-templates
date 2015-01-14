// http://our.saatchila.com/directory/get/?search=user&order=ASC&value=&limit=10&page=1&searchBy=full&divs=
"use strict";
(
    function(){
        var dependencies = ['angular','jquery',"../services/PageParameters","../services/Departments","selecter","../services/events/UsersEvent"];

        define(dependencies,function(angular) {

            var DirectoryController = function($rootScope,$scope,$http,$log,$document,pageParameters,departments,$interval,UsersEvent){

                console.log("DirectoryController");

                $rootScope.title = pageParameters.title + "People";
                $rootScope.bodyClass = "directory";

                $scope.departments = departments;
                $scope.searchBy = "full";
                $scope.searchType = 'user';
                $scope.searchStr = "";
                $scope.limit = 10;
                $scope.page = 1;
                $scope.pages = 1;
                $scope.divisions = [];
                $scope.searching = false;
                $scope.status = "";
                $scope.order = 'ASC';
                $scope.tags = [];

                // TODO: Hack to get emailURL. Not sure why it's not accessible through angular?
                $scope.emailURI = angular.element("[ng-model='emailURI']").val();

                // deal with external search
                var s = window.location.search;
                if(s.length > 0){
                    if(s.indexOf("search") !== 0){
                        var arr = s.split("=");
                        setTimeout(function(){
                            jQuery("#directory-search-input").val(arr[1]);
                            $scope.searchStr = arr[1];
                            $rootScope.$digest();
                        },10);
                    }
                }

                $scope.sendEmail = function(){
                    $scope.$broadcast("onSendEmail");
                };

                $rootScope.$on('onUsers',function(event,data){
                    console.log("DirectoryController.onUsers");

                    if(data.search !== undefined){
                        // set the number of pages
                        $scope.page = parseInt(data.search.page) + 1;
                        $scope.pages = parseInt(data.search.pages);
                        $scope.$broadcast(event.name,data);
                    }
                });


                $scope.$watch('searchStr',function(newValue,oldValue){
                    console.log("searchStr updated:" + newValue);
                });



                angular.element("document").ready(function(e){

                    $interval(function(){
                            angular.element("select").selecter({
                                cover:true
                            });
                    },100,1);


                });
            };

            DirectoryController.$inject = ['$rootScope','$scope','$http','$log','$document','PageParameters',"Departments","$interval","UsersEvent"];

            return DirectoryController;

        });


    }()
);
