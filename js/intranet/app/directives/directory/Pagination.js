/**
 * Toggles
 * jquery.toggles wrapper
 */

"use strict";
(
    function(){
        var dependencies = ['angular',"./DirectoryModule","../../directory/DirectoryController"];

        define(dependencies,function(angular,Module,DirectoryController) {

            console.log("directives.directory.Pagination");

            Module.directive("pagination",function factory($parse){
                console.log("pagination factory");
                var def = {
                    templateUrl: '/js/partials/directory/pagination.html',
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
                    }
                };
                return def
            });

        });


    }()
);
