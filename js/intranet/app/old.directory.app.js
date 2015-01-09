'use strict';

//***********************************************************
// Controllers
//***********************************************************

function NextPreviousController($scope,$location,$rootScope){

    $rootScope.$on('onUsers',function(event,data){
        console.log("[NextPreviousController][onUsers]");
        $scope.page = parseInt(data.search.page) + 1;
        $scope.pages = parseInt(data.search.pages);
    });

    $scope.nextPage = function(){
        console.log("nextPage");
        $scope.$emit('onNextPage');
    }

    $scope.previousPage = function(){
        $scope.$emit('onPreviousPage');
    }

}
NextPreviousController.$inject = ['$scope','$location',"$rootScope"];

function DirectoryController($scope, $location, $rootScope, $route, $routeParams){

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
    $scope.emailURI = jQuery("[ng-model='emailURI']").val();

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

    /*
     $rootScope.$on('onAlphabetNav',function(event,data){
     console.log("[DirectoryController][onAlphabethNav]" + data);

     if(data !== undefined){
     console.log("set searchStr to: " + data);
     $scope.searchStr = data;
     $rootScope.$digest();
     }
     });
     */

    $scope.sendEmail = function(){
        $scope.$broadcast("onSendEmail");
    };

    $rootScope.$on('onUsers',function(event,data){
        console.log("[DirectoryController] onUsers");

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



}
DirectoryController.$inject = ['$scope','$location',"$rootScope","$route","$routeParams"];

function DirectorySearchController($scope, $rootScope, $http, $templateCache, $location, $route)
{
    console.log("[DirectorySearchController] " );
    console.log("email: " + $scope.emailURI);

    $rootScope.$on('onNextPage',function(){
        $scope.nextPage();
    });

    $rootScope.$on('onPreviousPage',function(){
        $scope.previousPage();
    });

    $scope.previousPage = function(){
        console.log("[DirectorySearchController][previousPage]")
        if($scope.page > 1) {
            $scope.page -= 1;
            if(!$scope.searching){
                $scope.fetch();
            }
        }

    };

    $scope.nextPage = function(){
        console.log("[DirectorySearchController][nextPage] " + $scope.page + " : " + $scope.pages);
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

    $scope.setSearchType = function(value){
        console.log("[DirectorySearchController][setSearchBy]" + value);
        $scope.searchType = value;
        // Clear everything?
        $scope.searchStr = "";
        $scope.divisions = [];
        $scope.tags = [];

        //jQuery(".directory-nav .departments ")

        $scope.page = 1;
        $scope.fetch();

    };

    $scope.searchUpdate = function(){
        console.log("[DirectorySearchController][searchUpdate]");
    };

    /*
     * Updates selected divisions.
     */
    $scope.toggleDivision = function(value){
        console.log("[DirectorySearchController][addDivision] " + value + " current page: " + $scope.page + " total pages: " + $scope.pages);

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
    $scope.toggleTag = function(value){
        console.log("[DirectorySearchController][toggleTag] " + value);

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
        $scope.fetch();

    };

    $scope.fetch = function(){

        var url = '/directory/get/?search=' + $scope.searchType,
            val = $scope.searchStr;

        $scope.searching = true;

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

        $http.get(url).success(
            function(data, status, headers) {
                console.log("fetch complete");
                $scope.searching = false;
                $scope.$emit('onUsers',data);
            }
        ).error(
            function(data, status, headers){
                $scope.data = data || "Request failed";
                $scope.status = status;
                $scope.searching = false;
                $scope.$emit('onUsers',{});
            }
        );
    };

    /*
     $scope.fetchEmailList = function(){
     console.log("[DirectorySearchController][fetchEmailList]");
     var url = '/directory/getaddresses/?search=' + $scope.searchType,
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

     console.log(url);

     $http.get(url).success(
     function(data, status, headers) {

     console.dir(data.users);

     var user,
     resultStr = "";

     for(var l=data.users.length,i=0; i<l; i++){
     user = data.users[i];
     resultStr += user.email + ",";
     }


     //resultStr = resultStr.substr(0,resultStr.length-1);
     console.log(resultStr);

     //jQuery("body").append('<a href="mailto:' + resultStr + '" id="emailTarget"></a>');
     //window.open("mailto:" + resultStr + "?subject=Testing&body=Hello","","width=400,height:200");
     window.location.href= "mailto:" + resultStr;

     }
     ).error(
     function(data, status, headers){
     $scope.data = data || "Request failed";
     $scope.status = status;
     }
     );
     };
     */

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

        console.dir($scope);

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
            $scope.fetch();
        }
    });

    // deal with item coming from search field
    var s = window.location.search;

    if(s.length === 0){

        $scope.fetch();

    }

};
DirectorySearchController.$inject = ['$scope','$rootScope','$http','$templateCache','$location','$route'];

function DirectorySearchResultsController($scope,$log){

    $scope.users = [];

    $scope.render = function(data){
        console.log("[DirectorySearchResultsController] render");

        var users = data.users;

        if(users !== null){

            for(var index=0,length = users.length; index <length; index++){

                var user = users[index];

            }
        } else {
            console.log("No users were returned.");
        }

        $scope.users = data.users;

    }

    $scope.$on('onUsers',function(event,data){
        console.log("[DirectorySearchResultsController] onUsers");
        $scope.render(data);
    })

};
DirectorySearchResultsController.$inject = ['$scope',"$log"];


// Declare app level module which depends on filters, and services
var sslaDirectoryModule = angular.module('sslaDirectory',
    ['sslaDirectory.filters',
        'sslaDirectory.services',
        'sslaDirectory.directives',
        'ngResource']
)
    .config(function($interpolateProvider,$routeProvider, $locationProvider) {

        $interpolateProvider.startSymbol('{!{');
        $interpolateProvider.endSymbol('}!}');

    });

/*
 *
 *
 * Services
 *
 *
 * */

var servicesModule = angular.module('sslaDirectory.services', []);

servicesModule.value('version', '0.1');

/*
 *
 *
 * Filters
 *
 *
 * */
var filtersModule = angular.module('sslaDirectory.filters', []);

filtersModule.filter('interpolate', ['version', function(version) {
    return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    }
}]);

filtersModule.filter('test',
    function($metaObject){
        return function(){

            return "hello";
        }
    }
);


/*
 *
 * Directives
 *
 *
 * */

sslaDirectoryModule.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
        elm.text(version);
    };
}]);

var directivesModule = angular.module('sslaDirectory.directives', []);

directivesModule.directive('directoryUser', function factory($parse){
    console.log("directoryUser factory");
    var def = {
        templateUrl: '/js/partials/directoryuser.html',
        //template:'<div class="user"><div class="thumbnail">hello<img src="{!{ user.thumbnail }!}" /></div></div>"',
        restrict: 'AE',
        replace:true,
        scope: {
            profile: "@",
            directoryUser: "=",
            su: "@"
        },
        link: function linkFn(scope, el, attrs){
            var jq = jQuery(el);

            /*
             *Not retrieving meta anymore
             if(scope.directoryUser.meta !== null){
             var ul = jq.append("<ul class=\"meta\"></ul>");
             for(var key in scope.directoryUser.meta){
             ul.append("<li>" + key + " : " + scope.directoryUser.meta[key] + "</li>");
             }
             }
             */
            if(scope.su == "1"){
                var menuUl = jq.append("<ul class=\"menu\"></ul>");
                menuUl.append("<li><a href=\"\">Edit User</a></li>");
                menuUl.append("<li><a href=\"\">Delete User</a></li>");
            }


            if(scope.directoryUser.thumbnail === null){
                scope.directoryUser.thumbnail = "/media/no-photo"
            }

        }
    };
    return def;
});

directivesModule.directive("pagination",function factory($parse){
    var def = {
        templateUrl: '/js/partials/directorypagination.html',
        restrict: 'AE',
        replace:true,
        scope: {
            previousPage:'&',
            nextPage:'&'
        },
        controller: DirectoryController,
        link: function linkFn(scope, el, attrs, controller){
            scope.page = scope.$parent.page;
            scope.pages = scope.$parent.pages;
            //console.log("alphabentNav page:" + controller.page + " of " + controller.pages);

            //attrs.$observe('ngModel', function(value) {
            //console.log('ngModel has changed value to ' + value);
            //});

        }
    };
    return def
});

directivesModule.directive("paginationLink",function factory($parse){
    var def = {
        template:'<a>{{ l }}</a>',
        restrict: 'AE',
        replace:true,
        scope: false,
        link: function linkFn(scope, el, attrs){

            var jq = jQuery(el);
            el.bind('click', function(){
                var t = jQuery(this);
                scope.$emit('onPagination',t.text());
            });

        }
    };
    return def;
});



directivesModule.directive("alphabetNav",function factory($parse){
    var def = {
        templateUrl: '/js/partials/directoryalphabetnav.html',
        restrict: 'AE',
        replace:true,
        scope: {
            previousPage:'&',
            nextPage:'&'
        },

        link: function linkFn(scope, el, attrs){
            scope.page = scope.$parent.page;
            scope.pages = scope.$parent.pages;
            console.log("alphabentNav page:" + scope.page + " of " + scope.pages);
            var jq = jQuery(el);

            scope.letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];


        }
    };
    return def
});

directivesModule.directive("alphabetNavLink",function factory($parse){
    var def = {
        template:'<a>{{ l }}</a>',
        restrict: 'AE',
        replace:true,
        scope: false,
        link: function linkFn(scope, el, attrs){

            var jq = jQuery(el);
            el.bind('click', function(){
                var t = jQuery(this);
                scope.$emit('onAlphabetNav',t.text());
            });


        }
    };
    return def;
});

//***********************************************************
// BOOTSTRAP
//***********************************************************

angular.element(document).ready(function() {
    angular.bootstrap(document, ['sslaDirectory']);
});

