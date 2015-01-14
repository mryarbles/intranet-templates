"use strict";
(
    function(){
        var dependencies = ['angular','config',"../services/events/ListTypeEvent","../services/events/UsersEvent"];

        define(dependencies,function(angular,config,ListTypeEvent) {

            var DirectorySearchController = function($scope, $rootScope, $http, $templateCache, $location, $route, $log,ListTypeEvent,UsersEvent)
            {
                console.log("DirectorySearchController" );

                this.superUser = true; // This will be rendered to dom and grabbed
                this.displayType = "list";

                $rootScope.$on('onNextPage',function(){
                    this.nextPage();
                });

                $rootScope.$on('onPreviousPage',function(){
                    this.previousPage();
                });

                $rootScope.$on(ListTypeEvent.CHANGE,function(data){
                    $log.log("DirectorySearchController onListChange" + data);
                });

                this.previousPage = function(){
                    console.log("DirectorySearchController.previousPage")
                    if($scope.page > 1) {
                        $scope.page -= 1;
                        if(!$scope.searching){
                            $scope.fetch();
                        }
                    }

                };

                this.nextPage = function(){
                    console.log("DirectorySearchController.nextPage " + $scope.page + " : " + $scope.pages);
                    if($scope.page < $scope.pages) {
                        $scope.page += 1;
                        if(!$scope.searching){
                            $scope.fetch();
                        }
                    }

                };

                /**
                 * TODO: This method is no longer necessary.
                 * @param value
                 */
                /*$scope.setSearchBy = function(value){
                 console.log("[DirectorySearchController][setSearchBy]" + value);
                 $scope.searchBy = value;
                 };*/

                /*$scope.setSearchType = function(value){
                    console.log("DirectorySearchController.setSearchBy " + value);
                    $scope.searchType = value;
                    // Clear everything?
                    $scope.searchStr = "";
                    $scope.divisions = [];
                    $scope.tags = [];

                    //jQuery(".directory-nav .departments ")

                    $scope.page = 1;
                    $scope.fetch();

                };*/

                this.searchUpdate = function(){
                    console.log("DirectorySearchController.searchUpdate");
                };

                /*
                 * Updates selected divisions.
                 */
                this.toggleDivision = function(value){
                    console.log("DirectorySearchController.addDivision " + value + " current page: " + $scope.page + " total pages: " + $scope.pages);

                    var found = false;

                    for(var i=0,l=$scope.divisions.length;i<l;i++){
                        var d = $scope.divisions[i];
                        if(d === value){
                            found = true;
                            $scope.divisions.splice(i,1);
                            break;
                        }
                    }

                    if(!found){
                        $scope.divisions.push(value);
                    }

                    $scope.page = 1;
                    $scope.fetch();

                };

                /*
                 * Updates selected divisions.
                 */
                this.toggleTag = function(value){
                    console.log("DirectorySearchController.toggleTag " + value);

                    var found = false;

                    for(var i=0,l=$scope.tags.length;i<l;i++){
                        var d = $scope.tags[i];
                        if(d === value){
                            found = true;
                            $scope.tags.splice(i,1);
                            break;
                        }
                    }

                    if(!found){
                        $scope.tags.push(value);
                    }

                    console.log("tags:");
                    console.dir($scope.tags);

                    $scope.page = 1;
                    this.fetch();

                };

                this.fetch = function(){

                    console.log("DirectorySearchController.fetch");

                    //var url = 'http://10.13.18.19:3501/directory/get/?search=' + $scope.searchType,
                    var url = "test-data.json",
                        val = $scope.searchStr;

                    $scope.searching = true;

                    // in dev
                    if(config.dev !== true){
                        switch($scope.searchType){
                            case "tag":
                                url += "&order=" + $scope.order
                                + "&limit=" + $scope.limit
                                + "&page=" + $scope.page
                                + "&tags=" + $scope.tags.join(",");
                                break;
                            default:
                                url += "&order=" + $scope.order
                                + "&value=" + val
                                + "&limit=" + $scope.limit
                                + "&page=" + $scope.page
                                + "&searchBy=" + $scope.searchBy
                                + "&divs=" + $scope.divisions.join(",");
                                break;
                        }
                    }

                    $http.get(url).success(
                        function(data, status, headers) {
                            $scope.searching = false;
                            //$scope.$emit('onUsers',data);
                            UsersEvent.broadcast(data);
                        }
                    ).error(
                        function(data, status, headers){
                            $scope.data = data || "Request failed";
                            $scope.status = status;
                            $scope.searching = false;
                            //$scope.$emit('onUsers',{});
                            UsersEvent.broadcast(data);
                        }
                    );
                };


                /**
                 * This opens the email modal where user can compose email.
                 */
                $scope.openEmailModal = function(){

                    jQuery( "#emailModal" ).modal(
                        {
                            keyboard: true,
                            show: true,
                            backdrop: true
                        }
                    );
                    //$scope.fetchEmailList();
                };

                $scope.$on('onSendEmail',function(){
                    console.log("onSendEmail");

                    var email = jQuery("#emailModal textarea[name='email']").val(),
                        subject = jQuery("#emailModal input[name='subject']").val(),
                        url = $scope.emailURI + $scope.searchType,
                        val = $scope.searchStr;

                    switch($scope.searchType){
                        case "tag":
                            url += "&order=" + $scope.order
                            + "&tags=" + $scope.tags.join(",");
                            break;
                        default:
                            url += "&order=" + $scope.order
                            + "&value=" + val
                            + "&searchBy=" + $scope.searchBy
                            + "&divs=" + $scope.divisions.join(",");
                            break;
                    }

                    url += "&subject=" + subject + "&email=" + email;

                    $http.get(url).success(
                        function(data, status, headers) {

                            console.dir(data.users);

                            var user,
                                resultStr = "";

                            /*
                             for(var l=data.users.length,i=0; i<l; i++){
                             user = data.users[i];
                             resultStr += user.email + ",";
                             }
                             */

                            //resultStr = resultStr.substr(0,resultStr.length-1);


                            //jQuery("body").append('<a href="mailto:' + resultStr + '" id="emailTarget"></a>');
                            //window.open("mailto:" + resultStr + "?subject=Testing&body=Hello","","width=400,height:200");
                            //window.location.href= "mailto:" + resultStr;

                        }
                    ).error(
                        function(data, status, headers){
                            $scope.data = data || "Request failed";
                            $scope.status = status;
                        }
                    );

                });

                // when the search term changes fetch new content
                $scope.$watch('searchStr',function(newValue,oldValue){
                    if(newValue !== oldValue){
                        $scope.page = 1;
                        this.fetch();
                    }
                });

                ListTypeEvent.listen(function(e,data){
                    $log.log("DirectorySearchController.onListType");
                    $log.log(arguments);
                })


                // deal with item coming from search field
                var s = window.location.search;

                if(s.length === 0){

                    this.fetch();

                }

            };
            DirectorySearchController.$inject = ['$scope','$rootScope','$http','$templateCache','$location','$route','$log',"ListTypeEvent",'UsersEvent'];

            return DirectorySearchController;

        });


    }()
);
